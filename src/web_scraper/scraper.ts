import * as cheerio from 'cheerio';
import fetch from 'node-fetch'; 
import { CookieJar } from 'tough-cookie'; 

/**
 * A class for scraping web pages, handling cookies for session management.
 */
class Scraper {
    private cookieJar: CookieJar;

    constructor() {
        this.cookieJar = new CookieJar(); 
    }

    /**
     * Scrapes a web page for the title and paragraphs.
     * 
     * @param {string} url - The URL of the page to scrape.
     * @returns {Promise<{ title: string; paragraphs: string[] }>} - The scraped data, including the page title and paragraphs.
     * @throws {Error} - Throws an error if fetching or scraping fails.
     */
    public async WebScraper(url: string): Promise<{ title: string; paragraphs: string[] }> {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0', 
                    'Cookie': this.cookieJar.getCookieStringSync(url)
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch the page: ${response.statusText}`);
            }

            const cookies = response.headers.get('set-cookie');
            if (cookies) {
                this.cookieJar.setCookieSync(cookies, url);
            }

            const data = await response.text();
            const $ = cheerio.load(data);

            const pageTitle = $('title').text();
            const paragraphs: string[] = [];
            $('p').each((index, element) => {
                paragraphs.push($(element).text());
            });

            // Return the scraped data
            return { title: pageTitle, paragraphs };
        } catch (error) {
            console.error('Error scraping data:', error);
            throw new Error(`Scraping failed: ${(error as Error).message}`);
        }
    }
}

export default Scraper;


