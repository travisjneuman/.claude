---
name: blockchain-web3
description: Solidity smart contracts, Web3 development, DeFi protocols, NFTs, EVM chains, Hardhat/Foundry tooling, and blockchain security. Use when writing smart contracts, building dApps, auditing contract security, or integrating Web3 wallets.
---

# Blockchain & Web3 Development

## Smart Contract Development (Solidity)

### Contract Structure
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

### Security Patterns
- **Checks-Effects-Interactions:** Validate → update state → external calls
- **Reentrancy guard:** Use OpenZeppelin `ReentrancyGuard` or `nonReentrant`
- **Access control:** `Ownable`, `AccessControl`, or custom modifiers
- **Integer safety:** Solidity 0.8+ has built-in overflow checks
- **Pull over push:** Let users withdraw rather than sending funds

### Common Vulnerabilities
| Vulnerability | Prevention |
|--------------|------------|
| Reentrancy | `nonReentrant` modifier, CEI pattern |
| Front-running | Commit-reveal schemes, flashbot protection |
| Oracle manipulation | Use Chainlink, TWAP over spot prices |
| Unchecked return values | Always check `transfer()` return or use `safeTransfer` |
| Delegatecall injection | Never delegatecall to user-supplied addresses |

## Development Tooling

### Hardhat
```bash
npx hardhat init
npx hardhat compile
npx hardhat test
npx hardhat deploy --network sepolia
```

### Foundry
```bash
forge init
forge build
forge test -vvv
forge script script/Deploy.s.sol --rpc-url $RPC --broadcast
```

## Frontend Integration (ethers.js v6 / viem)

```typescript
// viem (recommended for new projects)
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })
const balance = await client.getBalance({ address: '0x...' })

// wagmi hooks (React)
import { useAccount, useBalance, useContractWrite } from 'wagmi'
const { address } = useAccount()
const { data: balance } = useBalance({ address })
```

## DeFi Patterns
- **AMM:** Constant product formula (x * y = k), concentrated liquidity
- **Lending:** Overcollateralized loans, liquidation mechanisms, interest rate models
- **Staking:** Reward distribution with `rewardPerToken` accumulator pattern
- **Governance:** Token-weighted voting, timelock controllers, proposal lifecycle

## Gas Optimization
- Use `calldata` over `memory` for read-only params
- Pack structs (smaller types together for slot efficiency)
- Use `unchecked` blocks for safe arithmetic
- Minimize storage reads/writes (cache in memory)
- Use events instead of storage for data that doesn't need on-chain access
