import { APIRequestContext } from "@playwright/test";
import createRepositoryPayload from "../payloads/repository/create";

export default class RepositoryService {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createRepository(repoName: string, authToken: string, description?: string) {
        const payload = createRepositoryPayload(repoName, description);
        return await this.request.post('/api/v1/user/repos', {
            data: payload,
            headers: {
                'Authorization': `token ${authToken}`
            }
        });

    }

    async deleteRepository(owner: string, repoName: string, authToken: string) {
        return await this.request.delete(`/api/v1/repos/${owner}/${repoName}`, {
            headers: {
                'Authorization': `token ${authToken}`
            }
        });
    }
}