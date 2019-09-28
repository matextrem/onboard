import metamask from "./wallets/metamask"
import dapper from "./wallets/dapper"
import walletConnect from "./wallets/wallet-connect"
import coinbase from "./wallets/coinbase"
import trust from "./wallets/trust"
import portis from "./wallets/portis"
import fortmatic from "./wallets/fortmatic"
import { networkName } from "../../utilities"

function init({
  heading,
  description,
  networkId,
  fortmaticInit,
  portisInit,
  walletConnectInit
}) {
  const desktopModules = [metamask(), dapper()]
  const mobileModules = [coinbase(), trust()]
  const network = networkName(networkId)

  if (portisInit) {
    desktopModules.push(portis({ ...portisInit, network }))
    mobileModules.push(portis({ ...portisInit, network }))
  }

  if (fortmaticInit) {
    desktopModules.push(fortmatic({ ...fortmaticInit, network }))
    mobileModules.push(fortmatic({ ...fortmaticInit, network }))
  }

  if (walletConnectInit) {
    desktopModules.push(
      walletConnect({ infuraKey: walletConnectInit.infuraKey })
    )
    mobileModules.push(
      walletConnect({ infuraKey: walletConnectInit.infuraKey })
    )
  }

  return {
    heading: heading || "Select a Wallet",
    description:
      description ||
      "Please select the wallet that you would like to use with this dapp:",
    wallets: {
      mobile: mobileModules,
      desktop: desktopModules
    }
  }
}

export default {
  init,
  metamask,
  dapper,
  walletConnect,
  coinbase,
  trust,
  portis,
  fortmatic
}