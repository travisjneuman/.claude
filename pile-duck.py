import duckdb, time
NOW=1793041626; B=1792972800
A='025d7d12-6890-4e10-96a9-316bd22aa73e'; C='d7f6bfd0-bb5e-4d63-8f90-5700bcba0bdb'
G='20261026T030125.368078783Z-9b9b643cb38abfb096f96921'
files=[f"/data/pile/archive/queries/source={s}/year=2026/month=10/queries-{G}.parquet" for s in (A,C)]
con=duckdb.connect(':memory:', config={'threads':1,'memory_limit':'512MiB'})
ST="CASE WHEN status IS NULL THEN status_code ELSE CASE upper(status) WHEN 'UNKNOWN' THEN 0 WHEN 'GRAVITY' THEN 1 WHEN 'FORWARDED' THEN 2 WHEN 'CACHE' THEN 3 WHEN 'REGEX' THEN 4 WHEN 'DENYLIST' THEN 5 WHEN 'EXTERNAL_BLOCKED_IP' THEN 6 WHEN 'EXTERNAL_BLOCKED_NULL' THEN 7 WHEN 'EXTERNAL_BLOCKED_NXRA' THEN 8 WHEN 'GRAVITY_CNAME' THEN 9 WHEN 'REGEX_CNAME' THEN 10 WHEN 'DENYLIST_CNAME' THEN 11 WHEN 'RETRIED' THEN 12 WHEN 'RETRIED_DNSSEC' THEN 13 WHEN 'IN_PROGRESS' THEN 14 WHEN 'DBBUSY' THEN 15 WHEN 'SPECIAL_DOMAIN' THEN 16 WHEN 'CACHE_STALE' THEN 17 WHEN 'EXTERNAL_BLOCKED_EDE15' THEN 18 ELSE NULL END END"
QT="CASE WHEN query_type IS NOT NULL THEN query_type ELSE CASE query_type_code WHEN 0 THEN 'NONE' WHEN 1 THEN 'A' WHEN 2 THEN 'AAAA' WHEN 3 THEN 'ANY' WHEN 4 THEN 'SRV' WHEN 5 THEN 'SOA' WHEN 6 THEN 'PTR' WHEN 7 THEN 'TXT' WHEN 8 THEN 'NAPTR' WHEN 9 THEN 'MX' WHEN 10 THEN 'DS' WHEN 11 THEN 'RRSIG' WHEN 12 THEN 'DNSKEY' WHEN 13 THEN 'NS' WHEN 14 THEN 'OTHER' WHEN 15 THEN 'SVCB' WHEN 16 THEN 'HTTPS' ELSE NULL END END"
def rel(frm,until):
    return (f"(SELECT *, {ST} AS pile_status_code, {QT} AS pile_query_type FROM read_parquet(?, union_by_name = true, hive_partitioning = false)) AS mapped "
            f"WHERE ((source_id = '{A}' AND event_time_s < {B}) OR (source_id = '{C}' AND event_time_s < {B})) AND event_time_s >= {frm} AND event_time_s < {until}")
BL="COALESCE(SUM(CASE WHEN pile_status_code IN (1,4,5,6,7,8,9,10,11,15,16,18) THEN 1 ELSE 0 END), 0)"
AL="COALESCE(SUM(CASE WHEN pile_status_code IN (2,3,12,13,17) THEN 1 ELSE 0 END), 0)"
CA="COALESCE(SUM(CASE WHEN pile_status_code IN (3,17) THEN 1 ELSE 0 END), 0)"
FW="COALESCE(SUM(CASE WHEN pile_status_code IN (2,12,13) THEN 1 ELSE 0 END), 0)"
ES="(CAST(event_time_s AS BIGINT) - CASE WHEN event_time_s < CAST(event_time_s AS BIGINT) THEN 1 ELSE 0 END)"
F24=NOW-86400; S0=F24-F24%900
BK=f"CAST(((pile_event_second - {S0}) - (((pile_event_second - {S0}) % 900 + 900) % 900)) / 900 AS BIGINT)"
def run(label, sql):
    for i in range(2):
        t=time.perf_counter(); rows=con.execute(sql,[files]).fetchall(); d=time.perf_counter()-t
    print(f"{label}: rows={len(rows)} {d*1000:.0f} ms")
R=rel(F24,NOW); P=rel(NOW-2*86400,F24)
#run("count24", f"SELECT COUNT(*) FROM {R}")
#run("identity", f"SELECT source_id, client_ip, client_name FROM {R} GROUP BY source_id, client_ip, client_name")
#run("domain pass", f"SELECT domain, COUNT(*), {BL}, {AL}, {CA}, {FW} FROM {R} GROUP BY domain")
#run("client pass", f"SELECT client_ip, MAX(client_name), COUNT(*), {BL} FROM {R} GROUP BY client_ip")
#run("src/type/time", f"SELECT source_id, pile_query_type, {BK} AS pile_bucket, COUNT(*), {BL}, {CA}, {FW} FROM (SELECT *, {ES} AS pile_event_second FROM {R}) AS timed GROUP BY source_id, pile_query_type, pile_bucket")
#run("clientDetail", f"SELECT client_ip, MIN(source_id), domain, MAX(client_name), COUNT(*), {BL}, MIN(event_time_s), MAX(event_time_s) FROM {R} GROUP BY client_ip, domain")
#run("prev count", f"SELECT COUNT(*), {BL}, {CA}, {FW} FROM {P}")
#run("prev domains", f"SELECT domain FROM {P} GROUP BY domain")
#run("prev clients", f"SELECT client_ip FROM {P} GROUP BY client_ip")
#run("wide raw", f"SELECT domain, client_ip, client_name, source_id, {BK} AS b, status, status_code, query_type, query_type_code, COUNT(*) FROM (SELECT *, {ES} AS pile_event_second FROM {R}) AS timed GROUP BY ALL")
#run("combined-like", f"SELECT domain, client_ip, source_id, {BK} AS b, MAX(client_name), COUNT(*), {BL}, {AL}, {CA}, {FW} FROM (SELECT *, {ES} AS pile_event_second FROM {R}) AS timed GROUP BY domain, client_ip, source_id, b")
F7=NOW-7*86400
R7=rel(F7,NOW)
run("7d count", f"SELECT COUNT(*) FROM {R7}")
run("7d identity", f"SELECT source_id, client_ip, client_name FROM {R7} GROUP BY source_id, client_ip, client_name")
for s in (A,C):
    run("7d page src", f"SELECT source_id, epoch_id, source_query_id, event_time_s, domain, client_ip, client_name, query_type, query_type_code, status, status_code, pile_status_code, reply_type, reply_type_code, reply_time_s, upstream, cname, dnssec, dnssec_code, quality_flags FROM {R7} AND source_id = '{s}' ORDER BY event_time_s DESC, source_id ASC, epoch_id ASC, source_query_id ASC LIMIT 101")
run("7d wide raw hourly", f"SELECT domain, client_ip, client_name, source_id, CAST(floor(event_time_s/3600) AS BIGINT) AS b, status, query_type, COUNT(*) FROM {R7} GROUP BY ALL")
