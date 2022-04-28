import { useState, useMemo } from 'react'
import MerkleDistributor from '../abis/MerkleDistributor.json'
import { nationDropContract } from './config'
import { useContractRead, useContractWrite } from './use-wagmi'

export function useClaimsFile() {
  const [data, setData] = useState({ isLoading: true })
  useMemo(async () => {
    try {
      const res = await fetch(
        `/tweetdrop/${process.env.NEXT_PUBLIC_CHAIN}.json`
      )
      const claims = await res.json()
      setData({ data: claims, isLoading: false })
    } catch (error) {
      setData({ error, isLoading: false })
    }
  }, [])
  return data
}

const contractParams = {
  addressOrName: nationDropContract,
  contractInterface: MerkleDistributor.abi,
}

export function useIsClaimed(index) {
  return useContractRead(contractParams, 'isClaimed', {
    args: [index],
    watch: true,
    enabled: !index,
  })
}

export function getClaimIndex(claims, address) {
  return claims[address]?.index
}

export function useClaimDrop({ index, account, amount, proof }) {
  return useContractWrite(contractParams, 'claim', {
    args: [index, account, amount, proof],
    overrides: {
      gasLimit: 150000,
    },
  })
}
