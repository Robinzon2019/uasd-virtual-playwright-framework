import { Page, Locator } from "@playwright/test"

export class Header {
    private page: Page
    private myCoursesLink: Locator

    constructor(page: Page) {
        this.page = page
        this.myCoursesLink = this.page.getByRole('link', {
            name: 'Mis Cursos',
            exact: true
        })  
    }

    getMyCoursesLink(): Locator {
        return this.myCoursesLink
    }

    async navigateToMyCourses(): Promise<void> {
        await this.getMyCoursesLink().click()
    }
}