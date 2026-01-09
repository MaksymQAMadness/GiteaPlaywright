import test from "@playwright/test";
import testUserData from '../../test-data/users/testuser1.json';
import { faker } from "@faker-js/faker";
import RepositoryService from "../../api/services/RepositoryService";

test.describe("Repositories API tests", () => {
    let repositoryService: RepositoryService;

    test.beforeEach(({ request }) => {
        repositoryService = new RepositoryService(request);
    });

    test.describe('Creating a repository', () => {

        test('Create a repository with just a name', async () => {
            const repoName = `test-repo-${Date.now()}`;
            const response = await repositoryService.createRepository(repoName, testUserData.userData.userToken);
            test.expect(response.status()).toBe(201);
            const responseBody = await response.json();
            test.expect(responseBody.name).toBe(repoName);
            test.expect(responseBody.full_name).toBe(`${testUserData.userData.username}/${repoName}`);
        });

        test('Attempt to create a repository without a name', async () => {
            const response = await repositoryService.createRepository('', testUserData.userData.userToken);
            test.expect(response.status()).toBe(422);
            const responseBody = await response.json();
            test.expect(responseBody.message).toContain('[Name]: Required');
        });

        test('Create a repository with a description', async () => {
            const repoName = `test-repo-${Date.now()}`;
            const repoDescription = faker.lorem.sentence();
            const response = await repositoryService.createRepository(repoName, testUserData.userData.userToken, repoDescription);
            test.expect(response.status()).toBe(201);
            const responseBody = await response.json();
            test.expect(responseBody.name).toBe(repoName);
            test.expect(responseBody.description).toBe(repoDescription);
        });

        test('Create a repository with invalid authentication token', async () => {
            const repoName = `test-repo-${Date.now()}`;
            const response = await repositoryService.createRepository(repoName, 'invalid_token');
            test.expect(response.status()).toBe(401);
            const responseBody = await response.json();
            test.expect(responseBody.message).toBe('invalid username, password or token');
        });

        test('Attempt to create a repository with special characters in the name', async () => {
            const repoName = `test-repo-!@#$%^&*()_${Date.now()}`;
            const response = await repositoryService.createRepository(repoName, testUserData.userData.userToken);
            test.expect(response.status()).toBe(422);
        });

        test('Attempt to create a repository with a very long name', async () => {
            const repoName = `test-repo-${'a'.repeat(250)}`;
            const response = await repositoryService.createRepository(repoName, testUserData.userData.userToken);
            test.expect(response.status()).toBe(422);
        });

        test('Create a repository with a name that already exists', async () => {
            const repoName = `test-repo-${Date.now()}`;
            const firstResponse = await repositoryService.createRepository(repoName, testUserData.userData.userToken);
            test.expect(firstResponse.status()).toBe(201);
            const secondResponse = await repositoryService.createRepository(repoName, testUserData.userData.userToken);
            test.expect(secondResponse.status()).toBe(409);
            const responseBody = await secondResponse.json();
            test.expect(responseBody.message).toContain('The repository with the same name already exists.');
        });

    });

    test.describe('Deleting a repository', () => {

        test('Create and delete a repository', async () => {
            const repoName = `test-repo-${Date.now()}`;
            const createResponse = await repositoryService.createRepository(repoName, testUserData.userData.userToken);
            test.expect(createResponse.status()).toBe(201);
            const createdRepo = await createResponse.json();
            test.expect(createdRepo.name).toBe(repoName);
            const deleteResponse = await repositoryService.deleteRepository(testUserData.userData.username, repoName, testUserData.userData.userToken);
            test.expect(deleteResponse.status()).toBe(204);
        });

        test('Attempt to delete a non-existent repository', async () => {
            const repoName = `non-existent-repo-${Date.now()}`;
            const deleteResponse = await repositoryService.deleteRepository(testUserData.userData.username, repoName, testUserData.userData.userToken);
            test.expect(deleteResponse.status()).toBe(404);
            const responseBody = await deleteResponse.json();
            test.expect(responseBody.message).toBe('not found');
        });
    });

});

test.afterAll(async ({ request }) => {
    const repositoryService = new RepositoryService(request);
    const response = await request.get(`/api/v1/user/repos`, {
        headers: {
            'Authorization': `token ${testUserData.userData.userToken}`
        }
    });
    const repos = await response.json();
    for (const repo of repos) {
        const repoName: string = repo.name;
        const owner: string = repo.owner.login;
        const response = await repositoryService.deleteRepository(owner, repoName, testUserData.userData.userToken);
        test.expect(response.status()).toBe(204);
    }
});
