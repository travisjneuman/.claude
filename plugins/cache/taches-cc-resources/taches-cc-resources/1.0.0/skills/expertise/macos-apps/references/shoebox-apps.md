# Shoebox/Library Apps

Apps with internal database and sidebar navigation (like Notes, Photos, Music).

<when_to_use>
Use shoebox pattern when:
- Single library of items (not separate files)
- No explicit save (auto-save everything)
- Import/export rather than open/save
- Sidebar navigation (folders, tags, smart folders)
- iCloud sync across devices

Do NOT use when:
- Users need to manage individual files
- Files shared with other apps directly
</when_to_use>

<basic_structure>
```swift
@main
struct LibraryApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: [Note.self, Folder.self, Tag.self])
        .commands {
            LibraryCommands()
        }
    }
}

struct ContentView: View {
    @State private var selectedFolder: Folder?
    @State private var selectedNote: Note?
    @State private var searchText = ""

    var body: some View {
        NavigationSplitView {
            SidebarView(selection: $selectedFolder)
        } content: {
            NoteListView(folder: selectedFolder, selection: $selectedNote)
        } detail: {
            if let note = selectedNote {
                NoteEditorView(note: note)
            } else {
                ContentUnavailableView("Select a Note", systemImage: "note.text")
            }
        }
        .searchable(text: $searchText)
    }
}
```
</basic_structure>

<data_model>
```swift
import SwiftData

@Model
class Note {
    var title: String
    var content: String
    var createdAt: Date
    var modifiedAt: Date
    var isPinned: Bool

    @Relationship(inverse: \Folder.notes)
    var folder: Folder?

    @Relationship
    var tags: [Tag]

    init(title: String = "New Note") {
        self.title = title
        self.content = ""
        self.createdAt = Date()
        self.modifiedAt = Date()
        self.isPinned = false
        self.tags = []
    }
}

@Model
class Folder {
    var name: String
    var icon: String
    var sortOrder: Int

    @Relationship(deleteRule: .cascade)
    var notes: [Note]

    var isSmartFolder: Bool
    var predicate: String?  // For smart folders

    init(name: String, icon: String = "folder") {
        self.name = name
        self.icon = icon
        self.sortOrder = 0
        self.notes = []
        self.isSmartFolder = false
    }
}

@Model
class Tag {
    var name: String
    var color: String

    @Relationship(inverse: \Note.tags)
    var notes: [Note]

    init(name: String, color: String = "blue") {
        self.name = name
        self.color = color
        self.notes = []
    }
}
```
</data_model>

<sidebar>
```swift
struct SidebarView: View {
    @Environment(\.modelContext) private var context
    @Query(sort: \Folder.sortOrder) private var folders: [Folder]
    @Binding var selection: Folder?

    var body: some View {
        List(selection: $selection) {
            Section("Library") {
                Label("All Notes", systemImage: "note.text")
                    .tag(nil as Folder?)

                Label("Recently Deleted", systemImage: "trash")
            }

            Section("Folders") {
                ForEach(folders.filter { !$0.isSmartFolder }) { folder in
                    Label(folder.name, systemImage: folder.icon)
                        .tag(folder as Folder?)
                        .contextMenu {
                            Button("Rename") { renameFolder(folder) }
                            Button("Delete", role: .destructive) { deleteFolder(folder) }
                        }
                }
                .onMove(perform: moveFolders)
            }

            Section("Smart Folders") {
                ForEach(folders.filter { $0.isSmartFolder }) { folder in
                    Label(folder.name, systemImage: "folder.badge.gearshape")
                        .tag(folder as Folder?)
                }
            }

            Section("Tags") {
                TagsSection()
            }
        }
        .listStyle(.sidebar)
        .toolbar {
            ToolbarItem {
                Button(action: addFolder) {
                    Label("New Folder", systemImage: "folder.badge.plus")
                }
            }
        }
    }

    private func addFolder() {
        let folder = Folder(name: "New Folder")
        folder.sortOrder = folders.count
        context.insert(folder)
    }

    private func deleteFolder(_ folder: Folder) {
        context.delete(folder)
    }

    private func moveFolders(from source: IndexSet, to destination: Int) {
        var reordered = folders.filter { !$0.isSmartFolder }
        reordered.move(fromOffsets: source, toOffset: destination)
        for (index, folder) in reordered.enumerated() {
            folder.sortOrder = index
        }
    }
}
```
</sidebar>

<note_list>
```swift
struct NoteListView: View {
    let folder: Folder?
    @Binding var selection: Note?

    @Environment(\.modelContext) private var context
    @Query private var allNotes: [Note]

    var filteredNotes: [Note] {
        let sorted = allNotes.sorted {
            if $0.isPinned != $1.isPinned {
                return $0.isPinned
            }
            return $0.modifiedAt > $1.modifiedAt
        }

        if let folder = folder {
            return sorted.filter { $0.folder == folder }
        }
        return sorted
    }

    var body: some View {
        List(filteredNotes, selection: $selection) { note in
            NoteRow(note: note)
                .tag(note)
                .contextMenu {
                    Button(note.isPinned ? "Unpin" : "Pin") {
                        note.isPinned.toggle()
                    }
                    Divider()
                    Button("Delete", role: .destructive) {
                        context.delete(note)
                    }
                }
        }
        .toolbar {
            ToolbarItem {
                Button(action: addNote) {
                    Label("New Note", systemImage: "square.and.pencil")
                }
            }
        }
    }

    private func addNote() {
        let note = Note()
        note.folder = folder
        context.insert(note)
        selection = note
    }
}

struct NoteRow: View {
    let note: Note

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                if note.isPinned {
                    Image(systemName: "pin.fill")
                        .foregroundStyle(.orange)
                        .font(.caption)
                }
                Text(note.title.isEmpty ? "New Note" : note.title)
                    .fontWeight(.medium)
            }

            Text(note.modifiedAt.formatted(date: .abbreviated, time: .shortened))
                .font(.caption)
                .foregroundStyle(.secondary)

            Text(note.content.prefix(100))
                .font(.caption)
                .foregroundStyle(.secondary)
                .lineLimit(2)
        }
        .padding(.vertical, 4)
    }
}
```
</note_list>

<editor>
```swift
struct NoteEditorView: View {
    @Bindable var note: Note
    @FocusState private var isFocused: Bool

    var body: some View {
        VStack(spacing: 0) {
            // Title
            TextField("Title", text: $note.title)
                .textFieldStyle(.plain)
                .font(.title)
                .padding()

            Divider()

            // Content
            TextEditor(text: $note.content)
                .font(.body)
                .focused($isFocused)
                .padding()
        }
        .onChange(of: note.title) { _, _ in
            note.modifiedAt = Date()
        }
        .onChange(of: note.content) { _, _ in
            note.modifiedAt = Date()
        }
        .toolbar {
            ToolbarItem {
                Menu {
                    TagPickerMenu(note: note)
                } label: {
                    Label("Tags", systemImage: "tag")
                }
            }

            ToolbarItem {
                ShareLink(item: note.content)
            }
        }
    }
}
```
</editor>

<smart_folders>
```swift
struct SmartFolderSetup {
    static func createDefaultSmartFolders(context: ModelContext) {
        // Today
        let today = Folder(name: "Today", icon: "calendar")
        today.isSmartFolder = true
        today.predicate = "modifiedAt >= startOfToday"
        context.insert(today)

        // This Week
        let week = Folder(name: "This Week", icon: "calendar.badge.clock")
        week.isSmartFolder = true
        week.predicate = "modifiedAt >= startOfWeek"
        context.insert(week)

        // Pinned
        let pinned = Folder(name: "Pinned", icon: "pin")
        pinned.isSmartFolder = true
        pinned.predicate = "isPinned == true"
        context.insert(pinned)
    }
}

// Query based on smart folder predicate
func notesForSmartFolder(_ folder: Folder) -> [Note] {
    switch folder.predicate {
    case "isPinned == true":
        return allNotes.filter { $0.isPinned }
    case "modifiedAt >= startOfToday":
        let start = Calendar.current.startOfDay(for: Date())
        return allNotes.filter { $0.modifiedAt >= start }
    default:
        return []
    }
}
```
</smart_folders>

<import_export>
```swift
struct LibraryCommands: Commands {
    @Environment(\.modelContext) private var context

    var body: some Commands {
        CommandGroup(after: .importExport) {
            Button("Import Notes...") {
                importNotes()
            }
            .keyboardShortcut("i", modifiers: [.command, .shift])

            Button("Export All Notes...") {
                exportNotes()
            }
            .keyboardShortcut("e", modifiers: [.command, .shift])
        }
    }

    private func importNotes() {
        let panel = NSOpenPanel()
        panel.allowedContentTypes = [.json, .plainText]
        panel.allowsMultipleSelection = true

        if panel.runModal() == .OK {
            for url in panel.urls {
                importFile(url)
            }
        }
    }

    private func exportNotes() {
        let panel = NSSavePanel()
        panel.allowedContentTypes = [.json]
        panel.nameFieldStringValue = "Notes Export.json"

        if panel.runModal() == .OK, let url = panel.url {
            let descriptor = FetchDescriptor<Note>()
            if let notes = try? context.fetch(descriptor) {
                let exportData = notes.map { NoteExport(note: $0) }
                if let data = try? JSONEncoder().encode(exportData) {
                    try? data.write(to: url)
                }
            }
        }
    }
}

struct NoteExport: Codable {
    let title: String
    let content: String
    let createdAt: Date
    let modifiedAt: Date

    init(note: Note) {
        self.title = note.title
        self.content = note.content
        self.createdAt = note.createdAt
        self.modifiedAt = note.modifiedAt
    }
}
```
</import_export>

<search>
```swift
struct ContentView: View {
    @State private var searchText = ""
    @Query private var allNotes: [Note]

    var searchResults: [Note] {
        if searchText.isEmpty {
            return []
        }
        return allNotes.filter { note in
            note.title.localizedCaseInsensitiveContains(searchText) ||
            note.content.localizedCaseInsensitiveContains(searchText)
        }
    }

    var body: some View {
        NavigationSplitView {
            // ...
        }
        .searchable(text: $searchText, placement: .toolbar)
        .searchSuggestions {
            if !searchText.isEmpty {
                ForEach(searchResults.prefix(5)) { note in
                    Button {
                        selectedNote = note
                    } label: {
                        VStack(alignment: .leading) {
                            Text(note.title)
                            Text(note.modifiedAt.formatted())
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                }
            }
        }
    }
}
```
</search>

<icloud_sync>
```swift
// Configure container for iCloud
@main
struct LibraryApp: App {
    let container: ModelContainer

    init() {
        let schema = Schema([Note.self, Folder.self, Tag.self])
        let config = ModelConfiguration(
            "Library",
            schema: schema,
            cloudKitDatabase: .automatic
        )

        do {
            container = try ModelContainer(for: schema, configurations: config)
        } catch {
            fatalError("Failed to create container: \(error)")
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(container)
    }
}

// Handle sync status
struct SyncStatusIndicator: View {
    @State private var isSyncing = false

    var body: some View {
        if isSyncing {
            ProgressView()
                .scaleEffect(0.5)
        } else {
            Image(systemName: "checkmark.icloud")
                .foregroundStyle(.green)
        }
    }
}
```
</icloud_sync>

<best_practices>
- Auto-save on every change (no explicit save)
- Provide import/export for data portability
- Use sidebar for navigation (folders, tags, smart folders)
- Support search across all content
- Show modification dates, not explicit "save"
- Use SwiftData with iCloud for seamless sync
- Provide trash/restore instead of permanent delete
</best_practices>
