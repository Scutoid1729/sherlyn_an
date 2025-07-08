class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
        this.life = Math.random() * 60 + 60;
        this.maxLife = this.life;
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 4 + 1;
        this.color = this.getRandomColor();
        this.opacity = Math.random() * 0.8 + 0.2;
        this.life = Math.random() * 60 + 60;
        this.maxLife = this.life;
    }

    getRandomColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
            '#feca57', '#ff9ff3', '#a8e6cf', '#ffd93d',
            '#6c5ce7', '#fd79a8', '#fdcb6e', '#e17055'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        // 边界检测
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

        // 保持在画布内
        this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        this.y = Math.max(0, Math.min(this.canvas.height, this.y));

        // 生命周期结束时重置
        if (this.life <= 0) {
            this.reset();
        }

        // 根据生命周期调整透明度
        this.opacity = (this.life / this.maxLife) * 0.8 + 0.2;
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 添加发光效果
        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        
        this.ctx.restore();
    }
}

class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = -10;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.size = Math.random() * 8 + 4;
        this.color = this.getRandomColor();
        this.shape = Math.floor(Math.random() * 3); // 0: 矩形, 1: 圆形, 2: 三角形
    }

    getRandomColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
            '#feca57', '#ff9ff3', '#FFD700', '#FF69B4',
            '#00CED1', '#FF6347', '#9370DB', '#32CD32'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.vy += 0.1; // 重力效果

        // 如果掉出屏幕底部，重置
        if (this.y > this.canvas.height + 20) {
            this.reset();
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation * Math.PI / 180);
        this.ctx.fillStyle = this.color;

        switch (this.shape) {
            case 0: // 矩形
                this.ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
                break;
            case 1: // 圆形
                this.ctx.beginPath();
                this.ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
                this.ctx.fill();
                break;
            case 2: // 三角形
                this.ctx.beginPath();
                this.ctx.moveTo(0, -this.size/2);
                this.ctx.lineTo(-this.size/2, this.size/2);
                this.ctx.lineTo(this.size/2, this.size/2);
                this.ctx.closePath();
                this.ctx.fill();
                break;
        }

        this.ctx.restore();
    }
}

class Heart {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height + 20;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = -(Math.random() * 2 + 1);
        this.size = Math.random() * 15 + 10;
        this.color = this.getRandomColor();
        this.opacity = Math.random() * 0.7 + 0.3;
        this.pulse = 0;
    }

    getRandomColor() {
        const colors = ['#ff6b6b', '#ff9ff3', '#FF69B4', '#FF1493', '#DC143C'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.1;

        // 如果飞出屏幕顶部，重置
        if (this.y < -50) {
            this.reset();
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillStyle = this.color;
        
        // 脉冲效果
        const pulseFactor = 1 + Math.sin(this.pulse) * 0.2;
        const size = this.size * pulseFactor;
        
        // 绘制心形
        this.ctx.translate(this.x, this.y);
        this.ctx.scale(size / 20, size / 20);
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 3);
        this.ctx.bezierCurveTo(-10, -5, -20, 1, -10, 15);
        this.ctx.bezierCurveTo(-5, 20, 0, 25, 0, 25);
        this.ctx.bezierCurveTo(0, 25, 5, 20, 10, 15);
        this.ctx.bezierCurveTo(20, 1, 10, -5, 0, 3);
        this.ctx.fill();
        
        // 添加发光效果
        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
        
        this.ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.confetti = [];
        this.hearts = [];
        
        this.resizeCanvas();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // 点击产生爆炸效果
        this.canvas.addEventListener('click', (e) => this.createExplosion(e.clientX, e.clientY));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // 创建背景粒子
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(this.canvas));
        }
        
        // 创建彩纸
        for (let i = 0; i < 30; i++) {
            this.confetti.push(new Confetti(this.canvas));
        }
        
        // 创建爱心
        for (let i = 0; i < 8; i++) {
            this.hearts.push(new Heart(this.canvas));
        }
    }

    createExplosion(x, y) {
        // 在点击位置创建爆炸效果
        for (let i = 0; i < 20; i++) {
            const particle = new Particle(this.canvas);
            particle.x = x;
            particle.y = y;
            particle.vx = (Math.random() - 0.5) * 10;
            particle.vy = (Math.random() - 0.5) * 10;
            particle.size = Math.random() * 6 + 2;
            particle.life = 30;
            particle.maxLife = 30;
            this.particles.push(particle);
        }
        
        // 移除多余的粒子
        if (this.particles.length > 150) {
            this.particles.splice(0, this.particles.length - 150);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 更新和绘制所有粒子
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        this.confetti.forEach(confetti => {
            confetti.update();
            confetti.draw();
        });
        
        this.hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    
    // 添加生日歌音效（可选）
    const playBirthdaySound = () => {
        // 创建简单的生日快乐旋律
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [
            { freq: 261.63, duration: 0.5 }, // C
            { freq: 261.63, duration: 0.5 }, // C
            { freq: 293.66, duration: 1 },   // D
            { freq: 261.63, duration: 1 },   // C
            { freq: 349.23, duration: 1 },   // F
            { freq: 329.63, duration: 2 }    // E
        ];
        
        let currentTime = audioContext.currentTime;
        
        notes.forEach(note => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(note.freq, currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + note.duration);
            
            currentTime += note.duration;
        });
    };
    
    // 3秒后播放音效
    setTimeout(() => {
        try {
            playBirthdaySound();
        } catch (e) {
            console.log('音频播放需要用户交互');
        }
    }, 3000);
    
    // 点击页面播放音效
    document.addEventListener('click', () => {
        try {
            playBirthdaySound();
        } catch (e) {
            console.log('音频播放失败');
        }
    }, { once: true });
});
