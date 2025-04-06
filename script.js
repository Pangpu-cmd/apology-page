document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModal');
    const apologyModal = document.getElementById('apologyModal');
    const forgiveBtn = document.getElementById('forgiveBtn');
    const notForgiveBtn = document.getElementById('notForgiveBtn');
    const pleadingContent = document.getElementById('pleadingContent');
    const initialContent = document.getElementById('initialContent');
    const finalForgiveBtn = document.getElementById('finalForgiveBtn');
    const heartContainer = document.getElementById('heartContainer');
    const heartCanvas = document.getElementById('heartCanvas');
    const apologyText = document.getElementById('apologyText');
    const pleadingText = document.getElementById('pleadingText');
    
    let scale = 1;
    const shrinkFactor = 0.8;
    const minScale = 0.1;
    let clickCount = 0;
    
    // 道歉话语列表
    const apologyMessages = [
        "请原谅我这次好吗？我保证不会再犯了！",
        "我知道错了，给我一次机会好不好？",
        "我真的很后悔，能不能原谅我这一次？",
        "没有你的日子我过得好难受，原谅我吧...",
        "我发誓这是最后一次，原谅我好吗？",
        "你对我太重要了，我不能没有你...",
        "我保证以后都听你的，原谅我嘛~",
        "我知道我让你失望了，但我会改的！",
        "你是我生命中最重要的人，别离开我...",
        "我错了，真的错了，原谅我好不好？"
    ];
    
    // 祈求原谅的话语列表
    const pleadingMessages = [
        "我真的知道错了，没有你我的世界都不完整了...",
        "求求你给我一次机会，我会用一生来补偿你...",
        "没有你的笑容，我的世界都是灰色的...",
        "我保证以后再也不惹你生气了，原谅我嘛...",
        "你是我生命中的阳光，没有你我无法呼吸...",
        "我知道我伤害了你，但我会用余生来弥补...",
        "我发誓以后把你捧在手心里，原谅我好吗？",
        "没有你的日子，每一秒都是煎熬...",
        "我愿用我的一切换你一个微笑，原谅我吧...",
        "你是我此生唯一的挚爱，别离开我..."
    ];
    
    // 打开弹窗
    openModalBtn.addEventListener('click', function() {
        apologyModal.style.display = 'flex';
        // 重置状态
        scale = 1;
        clickCount = 0;
        notForgiveBtn.style.transform = 'scale(1)';
        notForgiveBtn.style.display = 'block';
        initialContent.classList.remove('hidden');
        pleadingContent.classList.add('hidden');
        apologyText.textContent = apologyMessages[0];
    });
    
    // 点击"原谅"按钮
    forgiveBtn.addEventListener('click', function() {
        drawHeart();
    });
    
    // 点击"不原谅"按钮
    notForgiveBtn.addEventListener('click', function() {
        clickCount++;
        scale *= shrinkFactor;
        
        // 添加文字淡出效果
        apologyText.classList.add('text-fade');
        
        setTimeout(() => {
            // 更新文字
            const messageIndex = Math.min(clickCount, apologyMessages.length - 1);
            apologyText.textContent = apologyMessages[messageIndex];
            apologyText.classList.remove('text-fade');
        }, 300);
        
        if (scale <= minScale) {
            notForgiveBtn.style.display = 'none';
            initialContent.classList.add('hidden');
            pleadingContent.classList.remove('hidden');
            
            // 随机选择一条祈求原谅的话语
            const randomIndex = Math.floor(Math.random() * pleadingMessages.length);
            pleadingText.textContent = pleadingMessages[randomIndex];
        } else {
            notForgiveBtn.style.transform = `scale(${scale})`;
        }
    });
    
    // 点击最后的"原谅我嘛"按钮
    finalForgiveBtn.addEventListener('click', function() {
        apologyModal.style.display = 'none';
        drawHeart();
    });
    
    // 绘制爱心
    function drawHeart() {
        heartContainer.classList.remove('hidden');
        
        // 设置画布大小
        heartCanvas.width = window.innerWidth;
        heartCanvas.height = window.innerHeight;
        
        const ctx = heartCanvas.getContext('2d');
        const centerX = heartCanvas.width / 2;
        const centerY = heartCanvas.height / 2;
        const size = Math.min(heartCanvas.width, heartCanvas.height) * 0.4;
        
        let progress = 0;
        const duration = 2000; // 动画持续时间(毫秒)
        const startTime = Date.now();
        
        function animateHeart() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            progress = Math.min(elapsed / duration, 1);
            
            ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
            
            // 设置爱心颜色
            ctx.fillStyle = '#ff6b6b';
            ctx.strokeStyle = '#ff5252';
            ctx.lineWidth = 5;
            
            // 开始绘制爱心
            ctx.beginPath();
            
            // 计算当前进度的尺寸
            const currentSize = size * progress;
            
            // 绘制爱心左侧曲线
            ctx.moveTo(centerX, centerY - currentSize * 0.3);
            ctx.bezierCurveTo(
                centerX, centerY - currentSize * 0.7,
                centerX - currentSize * 0.5, centerY - currentSize * 0.5,
                centerX - currentSize * 0.5, centerY
            );
            
            // 绘制爱心右侧曲线
            ctx.bezierCurveTo(
                centerX - currentSize * 0.5, centerY + currentSize * 0.2,
                centerX, centerY + currentSize * 0.6,
                centerX, centerY + currentSize * 0.3
            );
            ctx.bezierCurveTo(
                centerX, centerY + currentSize * 0.6,
                centerX + currentSize * 0.5, centerY + currentSize * 0.2,
                centerX + currentSize * 0.5, centerY
            );
            ctx.bezierCurveTo(
                centerX + currentSize * 0.5, centerY - currentSize * 0.5,
                centerX, centerY - currentSize * 0.7,
                centerX, centerY - currentSize * 0.3
            );
            
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            if (progress < 1) {
                requestAnimationFrame(animateHeart);
            }
        }
        
        animateHeart();
    }
});
