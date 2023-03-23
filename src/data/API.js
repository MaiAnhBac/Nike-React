export const loginAndGetToken = (username, password) => {
    return (
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(res => res.json())
    )
};
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