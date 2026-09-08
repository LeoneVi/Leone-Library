function getCookie(name: string) {
    const cookie = document.cookie
        .split('; ')
        .find((item) => item.startsWith(`${name}=`))

    return cookie ? decodeURIComponent(cookie.split('=')[1] ?? '') : ''
}

export async function signupAuth(details: {
    username: string
    email: string
    password: string
}) {
    // request allauth to provide a CSRF cookie.
    await fetch('/_allauth/browser/v1/auth/session', {
        credentials: 'include',
    })

    const csrfToken = getCookie('csrftoken')

    const response = await fetch('/_allauth/browser/v1/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(details),
    })

    const body = await response.json()

    return {
        status: response.status,
        body,
    }
}

export async function loginAuth(credentials: {
    email: string
    password: string
}) {
    // ensure that Django has provided the CSRF cookie.
    await fetch('/_allauth/browser/v1/auth/session', {
        credentials: 'include',
    })

    const csrfToken = getCookie('csrftoken')

    const response = await fetch('/_allauth/browser/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(credentials),
    })

    const body = await response.json()

    return {
        status: response.status,
        body,
    }
}