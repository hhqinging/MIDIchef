import algosdk from 'algosdk';
import dotenv from "dotenv";

// dotenv.config({path: "../.env"});
dotenv.config();

// purestake info, store in dotenv
const ps_testnet = "https://testnet-algorand.api.purestake.io/ps2";
const port = process.env.PORT;
const token = {
    'X-API-Key': process.env.APITOKEN
};
// account mnemonic, store in dotenv
const midichef_addr = process.env.MIDICHEF_ADDR;
const mnemonic = process.env.MNEMONIC;
/* Creates an Algorand Standard Asset(ASA) in testnet
 * params: 
 *   assetName: Asset name
 *   hash: 32 bytes hash relevant to your asset
 *   note: Optional message
 * return:
 *   assetID: Asset ID
 */
export const createAsset = async function(assetName="MIDIChef", hash=undefined, note=undefined) {
    // Construct transaction with asset info
    const algodClient = new algosdk.Algodv2(token, ps_testnet, port);
    let params = await algodClient.getTransactionParams().do();
    let defaultFrozen = false;
    let decimals = 0;
    let totalIssuance = 1;
    let unitName = "NFT"

    let manager = midichef_addr;
    let freeze = midichef_addr;
    let clawback = midichef_addr;
    let reserve = midichef_addr;

    let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: midichef_addr,
        note: note,
        suggestedParams: params,
        total: totalIssuance,
        decimals: decimals,
        defaultFrozen: defaultFrozen,
        manager: manager,
        reserve: reserve,
        freeze: freeze,
        clawback: clawback,
        unitName: unitName,
        assetName: assetName,
        assetMetadataHash: hash
    });

    // Sign transaction
    let midiAccount = algosdk.mnemonicToSecretKey(mnemonic);
    let rawSignedTxn = txn.signTxn(midiAccount.sk);
    let tx = await algodClient.sendRawTransaction(rawSignedTxn).do();

    // Get info from transaction
    let ptx = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
    let assetID = ptx['asset-index']
    console.log(`Asset ${assetID} created in transaction ${tx.txId}`);
    return assetID;
}

/* Creates an Algorand Standard Asset(ASA) in testnet
 * params: 
 *   sender: Address of asset owner
 *   recipient: Address of asset buyer
 *   assetID: Asset ID
 *   note: Optional message
 * return:
 *   assetID: Asset ID
 */
export const transferAsset = async function(recipient, assetID, sender=midichef_addr, amount=1, note=undefined){
    if(!sender) return; // undefined sender
    if(!recipient) return; // undefined recipient
    if(!assetID) return; // undefined assetID

    const algodClient = new algosdk.Algodv2(token, ps_testnet, port);
    let params = await algodClient.getTransactionParams().do();

    // Construct transaction
    let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        note: note,
        suggestedParams: params,
        assetIndex: assetID,
        amount: amount,
        to: recipient
    });

    // Sign transaction
    let midiAccount = algosdk.mnemonicToSecretKey(mnemonic);
    let rawSignedTxn = xtxn.signTxn(midiAccount.sk);
    let xtx = await algodClient.sendRawTransaction(rawSignedTxn).do();

    let confirmedTxn = await algosdk.waitForConfirmation(algodClient, xtx.txId, 4);
    console.log(`Asset# ${assetID} transferred in transaction# ${xtx.txId}`);
}

/* Destroys an Algorand Standard Asset(ASA) in testnet
 * params: 
 *   assetID: Asset ID
 *   note: Optional message
 */
export const destroyAsset = async function(assetID, note=undefined){
    if(!assetID) return; // undefined assetID

    const algodClient = new algosdk.Algodv2(token, ps_testnet, port);
    let params = await algodClient.getTransactionParams().do();
    let dtxn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
        from: midichef_addr,
        note: note,
        suggestedParams: params,
        assetIndex: assetID
    });

    // Sign transaction
    let midiAccount = algosdk.mnemonicToSecretKey(mnemonic);
    let rawSignedTxn = dtxn.signTxn(midiAccount.sk);
    let dtx = await algodClient.sendRawTransaction(rawSignedTxn).do();

    let confirmedTxn = await algosdk.waitForConfirmation(algodClient, dtx.txId, 4);
    console.log(`Asset# ${assetID} destroyed in transaction# ${dtx.txId}`);
}
