export const setLS = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getLS = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '{}')
}

export const removeItemLS = (key: string) => {
    localStorage.removeItem(key)
}
