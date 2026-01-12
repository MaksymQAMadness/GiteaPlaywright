export default function createRepositoryPayload(repoName: string, description?: string) {
    const payload: any = {
        name: repoName
    };

    if (description) {
        payload.description = description;
    }

    return payload;
}