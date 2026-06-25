import { Page, Locator } from "@playwright/test"

export class MyCoursesPage {
    private page: Page
    private url: string
    private listTitleHeader: Locator
    private courseListItems: Locator
    private headerTitleContainer: Locator

    constructor(page: Page) {
        this.page = page
        this.url = `${process.env.BASE_URL}/diplomados/my`
        this.listTitleHeader = this.page.locator("#instance-144218-header")
        this.courseListItems = page.locator('div[role="listitem"]');
        this.headerTitleContainer = page.locator(".page-header-headings")
    }

    getListTitleHeader(): Locator {
        return this.listTitleHeader
    }

    getCourseListItems(): Locator {
        return this.courseListItems
    }

    getHeaderTitleContainer(): Locator {
        return this.headerTitleContainer
    }
}