// export const loginAndGetToken = (username, password) => {
//     return (
//         fetch('https://dummyjson.com/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 username: username,
//                 password: password,
//             })
//         })
//         .then(res => res.json())
//     )
// };
// tất cả sản phẩm
export const getAllProducts = () => {
    return (
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(res => res.json())
    )
};
//lọc sản phẩm khi select
export const getProductsByCate = (cate) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${cate}`)
            .then(res => res.json())
    )
};
// danh mục sản phẩm select option
export const getAllCategory = () => {
    return (
        fetch('https://api.escuelajs.co/api/v1/categories')
            .then(res => res.json())
    )
};
//lấy id theo sản phẩm vào trang chi tiết sản phẩm
export const getProductsByDetails = (id) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then(res => res.json())
    )
};
//phân trang 
export const getProductsByLimit = (off, limit) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products?offset=${off}&limit=${limit}`)
            .then(res => res.json())
    )
};
//lọc giá trị theo từ nhỏ tới lớn
export const getProductsByPrice = (min, max) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}`)
            .then(res => res.json())
    )
};
//Tạo tài khoản mới cho người dùng
export const postAddNewUser = (name, email,avatar, password) => {
    return (
        fetch('https://api.escuelajs.co/api/v1/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                avatar: avatar,
                password: password,
            })
        })
            .then(res => res.json())
    )
};
// AccessToken login
export const authorization = (accessToken) => {
    return (
        fetch('https://api.escuelajs.co/api/v1/auth/profile', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem('user', JSON.stringify(data))
            })
    )
}
export const login = (email, password) => {
    return (
        fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => res.json())
    )
}