import { expect, test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { env } from '../config/environment'
import { loginTestData } from '../config/loginTestData'

test.describe('Login Tests', () => {
    test('Should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const courseAccessedHeader = loginPage.getCourseAccessedHeader()

        await test.step('Navigate to the login page and perform login', async () => {
            await loginPage.navigate()
            await loginPage.doLogin(env.username, env.password)
        })

        await test.step('Verify successful login by checking the presence of the "Cursos accedidos recientemente" header', async () => {
            // Assertions to verify successful login
            await expect(courseAccessedHeader).toBeVisible()        
        })
    })

    test('It should display an error message when attempting to log in with an invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const errorMessage = loginPage.getErrorMessageLink()

        await test.step('Navigate to the login page and perform login with an invalid password', async () => {
            await loginPage.navigate()

            await loginPage.doLogin(env.username, loginTestData.invalidPassword)
        })

        await test.step('Verify error message is displayed', async () => {
            await expect(errorMessage).toBeVisible()
        })
    }) 

    test('It should display an error message when attempting to log in with an invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const errorMessage = loginPage.getErrorMessageLink()

        await test.step('Navigate to the login page and perform login with an invalid username', async () => {
            await loginPage.navigate()

            await loginPage.doLogin(loginTestData.invalidUsername, env.password)
        })

        await test.step('Verify error message is displayed', async () => {
            await expect(errorMessage).toBeVisible()
        })
    })
    
    test('It should display an error message when attempting to log in with a Non-existent user', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const errorMessage = loginPage.getErrorMessageLink()

        await test.step('Navigate to the login page and perform login with a non-existent user', async () => {
            await loginPage.navigate()

            await loginPage.doLogin(loginTestData.nonExistentUsername, env.password)
        })

        await test.step('Verify error message is displayed', async () => {
            await expect(errorMessage).toBeVisible()
        })
    }) 

    test('It should display an error message when attempting to log in with an empty user', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const errorMessage = loginPage.getErrorMessageLink()

        await test.step('Navigate to the login page and perform login with an empty user', async () => {
            await loginPage.navigate()

            await loginPage.doLogin(loginTestData.emptyValues, env.password)
        })

        await test.step('Verify error message is displayed', async () => {
            await expect(errorMessage).toBeVisible()
        })
    }) 

    test('It should display an error message when attempting to log in with an empty password', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const errorMessage = loginPage.getErrorMessageLink()

        await test.step('Navigate to the login page and perform login with an empty password', async () => {
            await loginPage.navigate()

            await loginPage.doLogin(env.username, loginTestData.emptyValues)
        })

        await test.step('Verify error message is displayed', async () => {
            await expect(errorMessage).toBeVisible()
        })
    }) 

    test('It should display an error message when attempting to log in with all empty values', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const errorMessage = loginPage.getErrorMessageLink()

        await test.step('Navigate to the login page and perform login with all empty values', async () => {
            await loginPage.navigate()

            await loginPage.doLogin(loginTestData.emptyValues, loginTestData.emptyValues)
        })

        await test.step('Verify error message is displayed', async () => {
            await expect(errorMessage).toBeVisible()
        })
    })
    
    test('Should navigate to the password recovery page when clicking on the "Forgotten your username or password?" link', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const forgotPasswordLink = loginPage.getForgotPasswordLink()

        await test.step('Navigate to the login page', async () => {
            await loginPage.navigate()
        })

        await test.step('Click on the "Forgotten your username or password?" link', async () => {
            await forgotPasswordLink.click()
        })

        console.log('Current URL:', page.url()); // Log the current URL for debugging
        await test.step('Verify navigation to the password recovery page', async () => {
            await expect(page).toHaveURL(/forgot_password/)
        })

        await test.step('Verify the presence of the "Search by username or email address" fieldset', async () => {
            const searchByUsernameFieldSet = loginPage.getSearchByUsernameFieldSet()
            await expect(searchByUsernameFieldSet).toBeVisible()
        })
    })
})
