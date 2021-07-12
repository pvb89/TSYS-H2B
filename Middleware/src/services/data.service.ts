import fetch from 'node-fetch';
import base64 from 'base-64';
import HttpsProxyAgent from 'https-proxy-agent';
import { mapping } from '../helpers/mapping.helper';

class dataService {
    // private proxyAgent = HttpsProxyAgent('http://tsl3isa.t-systems.co.uk:8080');
    private username = "TSI_COM_USER"
    private password = "KJLAKyQAWLbsTmmuVPMAYHhP5a]XMcFXpcHerzEh"
    private filiale = "1010"
    private options = {
        method: 'GET',
        // agent: this.proxyAgent,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + base64.encode(this.username + ":" + this.password)
        }
    }

    public async getProductId(productDescription: string) {
        const url = `https://my301481.s4hana.ondemand.com/sap/opu/odata/sap/MD_C_PRODUCT_MAINTAIN_SRV/C_Product?sap-client=100&$skip=0&$top=1&$filter=ProductDescription%20eq%20%27${productDescription}%27`
        return await fetch(url, this.options)
            .then(async (res) => await res.json())
            .then((jsonData) => jsonData.d.results[0].Product)
            .catch((err) => {
                console.error(err);
            });
    }

    public async getMapping(productId: string) {
        return mapping.find((item) => item.map === productId)
    }

    public async getStorageLocation(productId: string) {
        const url = `https://my301481.s4hana.ondemand.com/sap/opu/odata/sap/API_PRODUCT_SRV/A_ProductPlant(Product='${productId}',Plant='${this.filiale}')/to_StorageLocation`
        return await fetch(url, this.options)
            .then(async (res) => await res.json())
            .then((jsonData) => jsonData.d.results[0].StorageLocation)
            .catch((err) => {
                console.error(err);
            });
    }

}

export default dataService;