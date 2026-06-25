

import { test, expect } from 'playwright/test';
import { Header } from '../components/header';
import { LoginPage } from '../pages/LoginPage';
import { MyCoursesPage } from '../pages/MyCoursesPage';
import { env } from '../config/environment'

test.describe('My Courses Page test', () => {
    test('Should navigate to My Courses page successfully', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const header = new Header(page)
        const myCoursesPage = new MyCoursesPage(page)
        const listTitleHeader = myCoursesPage.getListTitleHeader()

        await test.step('Login to the application', async () => {
            await loginPage.navigate()
            await loginPage.doLogin(env.username, env.password)
        })

        await test.step('Navigate to My Courses page', async () => {
            await header.navigateToMyCourses()
        })

        await test.step('Verify navigation to My Courses page by checking the presence of the list title header', async () => {
            // Assertions to verify successful navigation to My Courses page
            await expect(listTitleHeader).toBeVisible()
        })
    })

    test("Should display a list of courses that the user is enrolled in", async ({ page }) => {
        const loginPage = new LoginPage(page)
        const header = new Header(page)
        const myCoursesPage = new MyCoursesPage(page)
        
        await test.step('Login to the application', async () => {
            await loginPage.navigate()
            await loginPage.doLogin(env.username, env.password)
        })
        
        await test.step('Navigate to My Courses page', async () => {
            await header.navigateToMyCourses()
        })
        
        await test.step('Verify the list of courses is displayed', async () => {
            await page.waitForLoadState("networkidle")
            const courseListItems = myCoursesPage.getCourseListItems()

            const allCourses = await courseListItems.all()
            const courseQuantity = await allCourses.length
            expect(courseQuantity).toBeGreaterThan(0)
        })
    })

    test("Should see course details page when clicking on a course from the list", async ({ page }) => {
        const loginPage = new LoginPage(page)
        const header = new Header(page)
        const myCoursesPage = new MyCoursesPage(page)

        await test.step('Login to the application', async () => {
            await loginPage.navigate()
            await loginPage.doLogin(env.username, env.password)
        })

        await test.step('Navigate to My Courses page', async () => {
            await header.navigateToMyCourses()
        })

        await test.step('Click on a course from the list and verify course details are displayed', async () => {
            await page.waitForLoadState("networkidle")
            const courseListItems = myCoursesPage.getCourseListItems()
            const firstCourse = courseListItems.first()
            await firstCourse.click()

            const headerTitleContainer = myCoursesPage.getHeaderTitleContainer()
            await expect(headerTitleContainer).toBeVisible()
        })
    })
})      