import fetch from 'node-fetch';
import { promisify } from 'util';
import dns from 'dns';

const resolve = promisify(dns.resolve4);
const reverse = promisify(dns.reverse);

class GeolocationService {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async getGeolocation(hostnameOrIp: string): Promise<any> {
        let ipAddress: string;
        let domainName: string;

        try {
            ipAddress = await this.resolveHostnameToIp(hostnameOrIp);
            domainName = hostnameOrIp;
        } catch (error) {
            ipAddress = hostnameOrIp;
            domainName = await this.reverseDnsLookup(ipAddress);
        }

        const geolocationData = await this.fetchGeolocationData(ipAddress);
        return { ...geolocationData, domainName };
    }

    private async resolveHostnameToIp(hostname: string): Promise<string> {
        try {
            const addresses = await resolve(hostname);
            return addresses[0]; 
        } catch (error:any) {
            throw new Error(`Failed to resolve hostname: ${error.message}`);
        }
    }

    private async reverseDnsLookup(ipAddress: string): Promise<string> {
        try {
            const hostnames = await reverse(ipAddress);
            return hostnames.length > 0 ? hostnames[0] : 'N/A';
        } catch (error) {
            return 'N/A';
        }
    }

    private async fetchGeolocationData(ipAddress: string): Promise<any> {
        try {
            const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${this.apiKey}&ip=${ipAddress}`, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0', 
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch geolocation data: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching geolocation data:', error);
            throw new Error(`Geolocation retrieval failed: ${(error as Error).message}`);
        }
    }
}

export default GeolocationService;
