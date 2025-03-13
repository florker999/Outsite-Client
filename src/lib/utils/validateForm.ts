export default function validateForm<FormStructure>(formData: FormData, requiredFieldNames: (keyof FormStructure & string)[]): boolean {
    for (const fieldName of requiredFieldNames) {
        if (!formData.has(fieldName))
            return false;
    }

    return true;
}
