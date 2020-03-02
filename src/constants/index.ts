export const corsRequestBody = {
    withCredentials: true,
}

export const corsPostRequestBody = {
    ...corsRequestBody,
    contentType: 'multiple/form-data',
}