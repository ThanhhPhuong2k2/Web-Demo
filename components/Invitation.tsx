
import React from 'react';
import { ICONS } from './Icons';
import { FadeUp, StaggerContainer, FadeInItem } from './ui/Animations';

interface InvitationProps {
  guestName: string;
  pronoun: string;
}

const Invitation: React.FC<InvitationProps> = ({ guestName, pronoun }) => {
  return (
    <section className="px-4">
      <div className="container max-w-md mx-auto">
        <FadeUp>
          {/* Transparent Glass Card */}
          <div className="relative rounded-[24px] p-8 border border-brand-gold/20 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
             
             {/* Decorative Corner */}
             <div className="absolute top-0 right-0 p-4 opacity-40">
               <ICONS.Heart className="w-10 h-10 text-brand-gold" />
             </div>
             
             <h2 className="font-script text-3xl text-brand-dark mb-6 text-center drop-shadow-sm">Lời ngỏ</h2>
             
             <StaggerContainer className="space-y-4 text-brand-dark/90 font-body leading-7 text-justify text-[15px]">
               <FadeInItem>
                 <p>
                   Ngày {pronoun} về chung một nhà đang đến rất gần, và trong lòng {pronoun} đang tràn ngập niềm háo hức xen lẫn hồi hộp.
                 </p>
               </FadeInItem>
               <FadeInItem>
                 <p>
                   {pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} đang chuẩn bị một buổi tiệc thật ấm cúng và thân mật. Hơn cả một đám cưới, {pronoun} muốn đây là dịp để những người thân yêu nhất cùng ngồi lại, chia sẻ niềm vui trong khoảnh khắc đặc biệt này.
                 </p>
               </FadeInItem>
               <FadeInItem>
                 <p>
                   Rất mong <span className="font-bold">{guestName}</span> có thể sắp xếp thời gian để đến chung vui. Sự hiện diện của <span className="font-bold">{guestName}</span>, dù chỉ là ghé qua gửi một lời chúc, cũng là món quà vô giá với {pronoun} rồi.
                 </p>
               </FadeInItem>
             </StaggerContainer>

             <div className="mt-8 flex justify-center opacity-50">
               <ICONS.DecorationFlower className="w-8 h-8 text-brand-dark" />
             </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default Invitation;
