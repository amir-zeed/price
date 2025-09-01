//step 1: get DOM // تعليق توضيحي في الكود
let nextDom = document.getElementById('next'); // التقاط عناصر من DOM عبر المعرّف للتحكم بها
let prevDom = document.getElementById('prev'); // التقاط عناصر من DOM عبر المعرّف للتحكم بها

let carouselDom = document.querySelector('.carousel'); // تعريف متغير للاستخدام لاحقاً
let SliderDom = carouselDom.querySelector('.carousel .list'); // تعريف متغير للاستخدام لاحقاً
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail'); // تعريف متغير للاستخدام لاحقاً
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item'); // تعريف متغير للاستخدام لاحقاً
let timeDom = document.querySelector('.carousel .time'); // تعريف متغير للاستخدام لاحقاً

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000; // تعريف متغير للاستخدام لاحقاً
let timeAutoNext = 7000; // تعريف متغير للاستخدام لاحقاً

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut; // تعريف متغير للاستخدام لاحقاً
let runNextAuto = setTimeout(() => { // تعريف متغير للاستخدام لاحقاً
    next.click(); // محاكاة نقر زر التالي/السابق للتنقل تلقائياً
}, timeAutoNext)
function showSlider(type){ // تعريف دالة تنفّذ سلوكاً معيناً
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item'); // تعريف متغير للاستخدام لاحقاً
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item'); // تعريف متغير للاستخدام لاحقاً
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next'); // تغيير الأصناف (classes) لتفعيل تأثيرات CSS
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev'); // تغيير الأصناف (classes) لتفعيل تأثيرات CSS
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => { // مؤقّت لتنفيذ أمر بعد مدة زمنية
        carouselDom.classList.remove('next'); // تغيير الأصناف (classes) لتفعيل تأثيرات CSS
        carouselDom.classList.remove('prev'); // تغيير الأصناف (classes) لتفعيل تأثيرات CSS
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => { // مؤقّت لتنفيذ أمر بعد مدة زمنية
        next.click(); // محاكاة نقر زر التالي/السابق للتنقل تلقائياً
    }, timeAutoNext)
}
