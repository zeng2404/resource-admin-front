export const corsRequestBody = {
    withCredentials: true,
};

export const corsPostRequestBody = {
    ...corsRequestBody,
    contentType: 'multiple/form-data',
};

export const corsPutRequestBody = corsPostRequestBody;

export const rowsPerPageOptions: number[] = [5, 10, 20, 30, 40, 50];

