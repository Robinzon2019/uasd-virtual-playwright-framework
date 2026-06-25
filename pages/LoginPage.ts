import { Locator, Page } from '@playwright/test'
import { env } from '../config/environment'

export class LoginPage {
    private page: Page
    private url: string
    private usernameInput: Locator
    private passwordInput: Locator
    private loginButton: Locator
    private courseAccessedHeader: Locator
    private errorMessageLink: Locator
    private forgotPasswordLink: Locator
    private searchByUsernameFieldSet: Locator

    constructor(page: Page) {
        this.page = page
        this.url = `${env.baseUrl}/diplomados/login/index.php`
        this.usernameInput = this.page.locator('#username')
        this.passwordInput = this.page.locator("//input[@id='password']")
        this.loginButton = this.page.locator("button[id='loginbtn']")
        this.courseAccessedHeader = this.page.getByRole("heading", { name: "Cursos accedidos recientemente", exact: true })
        this.errorMessageLink = this.page.locator('id=loginerrormessage')
        this.forgotPasswordLink = this.page.locator('//a[@href="https://uasdvirtual.uasd.edu.do/diplomados/login/forgot_password.php"]')
        this.searchByUsernameFieldSet = this.page.locator('fieldset[id="id_searchbyusername"]')
    }

    getUsernameInput(): Locator {
        return this.usernameInput
    }

    getPasswordInput(): Locator {
        return this.passwordInput
    }

    getCourseAccessedHeader(): Locator {
        return this.courseAccessedHeader
    }

    getErrorMessageLink(): Locator {
        return this.errorMessageLink
    }

    getForgotPasswordLink(): Locator {
        return this.forgotPasswordLink
    }

    getSearchByUsernameFieldSet(): Locator {
        return this.searchByUsernameFieldSet
    }

    async navigate(): Promise<void> {
        await this.page.goto(this.url)
    }

    async doLogin(username: string, password: string): Promise<void> {
        await this.getUsernameInput().fill(username)
        await this.getPasswordInput().fill(password)
        await this.loginButton.click()
    }
}