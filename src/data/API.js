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
export const getProductsByPrice = (min, max, limit) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}&offset=10&limit=${limit}`)
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
};
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
};
//Create New Product
export const createNewProduct =(title,price,description,categoryId,images) => {
    return (
        fetch('https://api.escuelajs.co/api/v1/products/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                price: price,
                description: description,
                categoryId: categoryId,
                images: images
            })
        })
            .then((res) => res.json())
    )
}
//Delete products
export const deleteProduct = (id) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
        })
            .then((res) => res.json())
    )
}
//Searches for products
export const getSearchProduct = (title) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products/?title=${title}`)
            .then((res) => res.json())
    )
}
//update User password
export const updateUser = (id, password) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                id: id,
                password: password
            })
        })
    )
};
//user
export const getUser = (id) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/users/${id}`)
            .then(res => res.json())
    )
};
//update user infomation
export const updateUserInfo = (id,name ,avatar) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                id: id,
                name: name,
                avatar: avatar
            })
        })
    )
};