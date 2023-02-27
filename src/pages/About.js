import Layout from "../components/Layout/Layout";
import {Box, Typography} from '@mui/material'
import '../styles/About.css'

function About() {
    return ( 
        <Layout>
            <Box sx={{my: 6, textAlign: "center", "@media (max-width: 600px)": {mt: 0, "& h3": {fontSize: "1.5rem"}}}} >
                <Typography variant="h3" fontWeight={"bold"} padding={10} >
                    Welcome to My Restaurant
                </Typography>
                <p className="box-p">
                - “Food” là "Ngon" với nguồn nguyên liệu hữu cơ trung hoà cùng nguyên liêu sạch tự nhiên tạo ra công thức OSO thẩm thấu từ tâm ý khách hàng. OSO cùng bếp trưởng 5 sao hiến tạo làm ra giá trị món ăn chất lượng hảo hạng với thông điệp xứng danh ăn ”Ngon” đến với lòng ý quý bạn từ OSO.
                </p>
                <br />
                <p className="box-p">- “Food” Là “Đẹp” với món ăn bày trí đẹp hoà lẫn màu sắc tươi ngon từ thiên nhiên ban tặng hướng đến quý khách cùng OSO ăn đẹp thân tâm. OSO góp thêm phần đẹp hoà khung cảnh hạ tầng xanh sạch tầm nhìn View Khung Trời “Phố - Vườn Tượng - Cổ Viện - Sông - Biển- Núi - Cánh buồm lớn - Cầu Rồng Vàng Lớn ... của Đà Thành - Bản đồ Việt Nam (S) ban tặng hài hoà ngay trong tầm mắt bắt vào tâm hồn của Quý Bạn cùng hoà thưởng thức món ăn tinh thần đẹp, ý về vẻ đẹp thì chắc là còn rất nhiều nơi đây trong khi OSO gửi phần đến tính trung hoà vẻ đẹp hiện hữu. Bên cạnh một phần không nhỏ góp thêm vào vẻ đẹp là sự tinh tế trong cung cách phục vụ từ lòng người OSO ... và OSO cũng hiểu còn vẻ đẹp Lớn của vẻ đẹp mà OSO ngoài tâm sức và luôn mong đợi để tiếp giúp sức OSO xây dựng ngày càng đẹp lên đó là Vẻ đẹp Lớn từ “Tấm Lòng Đẹp của Quý Khách Bạn” cùng nhớ đến ngày càng yêu mến cùng OSO để hướng thông điệp ăn” Đẹp” vào tâm ý Quý Khách Bạn.</p>
                <br />
                <p className="box-p">- “Food” là” Khỏe” với nguồn gốc nguyên liệu sạch rõ ràng, bảo quản tươi sạch đến khi hiến tạo ra đến món luôn “giữ lại dưỡng chất thiên nhiên phần cốt lõi của nguồn nguyên liệu giúp cơ thể hấp thụ dễ dàng” để phục vụ tâm vui hơn là ăn ngon, ăn đẹp, ăn khoẻ với hướng đến thông điệp “thân khỏe - tâm khỏe” vào tâm ý Quý Khách Bạn từ OSO.</p>
            </Box>
        </Layout>
     );
}

export default About;