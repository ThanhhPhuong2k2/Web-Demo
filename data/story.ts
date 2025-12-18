
export interface StoryItem {
  id: string;
  title: string;
  content: string;
  icon: 'Coffee' | 'Calendar' | 'Plane' | 'Ring';
  jsonUrl: string;
}

export const STORY_DATA: StoryItem[] = [
  {
    id: '01',
    title: 'Gặp gỡ & Rung động',
    content: 'Bén duyên từ những ngày nhiệt huyết với màu áo xanh Đoàn thanh niên. Ban đầu chỉ là những buổi tụ tập chung cả nhóm, rồi chẳng biết từ lúc nào, những cuộc trò chuyện riêng cứ dài thêm, và chúng mình nhận ra đối phương chính là mảnh ghép còn thiếu.',
    icon: 'Coffee',
    jsonUrl: "https://res.cloudinary.com/dooptsu3i/image/list/chap1.json"
  },
  {
    id: '02',
    title: 'Những ngày hẹn hò',
    content: 'Những buổi tối dạo phố, những món ăn vỉa hè, những câu chuyện không đầu không cuối. Bình yên cứ thế lớn dần lên qua từng ánh mắt và nụ cười.',
    icon: 'Calendar',
    jsonUrl: "https://res.cloudinary.com/dooptsu3i/image/list/chap2.json"
  },
  {
    id: '03',
    title: 'Hành trình bên nhau',
    content: 'Chúng mình đã nắm tay nhau đi qua Đà Nẵng nắng gió, Đà Lạt mộng mơ, Hà Nội cổ kính, Ninh Bình non nước và cả một chuyến đi thật đáng nhớ tại Lào. Từng cùng nhau vượt qua thử thách của những ngày yêu xa giữa Việt Nam và Nhật Bản, để rồi hôm nay vẫn chọn nắm tay nhau đi tiếp. Mỗi hành trình đã qua đều trở thành kỷ niệm, và chặng đường phía trước chúng mình vẫn mong sẽ tiếp tục cùng nhau viết nên thật nhiều khoảnh khắc đẹp.',
    icon: 'Plane',
    jsonUrl: "https://res.cloudinary.com/dooptsu3i/image/list/chap3.json"
  },
  {
    id: '04',
    title: 'Về chung một nhà',
    content: 'Dưới ánh đèn lãng mạn, lời cầu hôn được thốt ra. Nàng đã gật đầu đồng ý. Với sự chúc phúc của hai bên gia đình, chúng mình chính thức mở ra một chương mới:\n\nHôn Nhân.',
    icon: 'Ring',
    jsonUrl: "https://res.cloudinary.com/dooptsu3i/image/list/chap4.json"
  }
];
