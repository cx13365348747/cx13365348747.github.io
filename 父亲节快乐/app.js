// ========== 配置常量 ==========
const CORRECT_NAME = '冯光固';
const CORRECT_AGE = '54';

// ========== 页面映射 ==========
const steps = {
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),
    step3: document.getElementById('step3'),
    step4: document.getElementById('step4'),
    step5: document.getElementById('step5'),
    step6: document.getElementById('step6')
};

const backBtn = document.getElementById('backBtn');
const toast = document.getElementById('toast');
const toastIcon = toast.querySelector('.toast-icon');
const toastMessage = toast.querySelector('.toast-message');

// 页面顺序（用于返回）
const stepOrder = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'];

// ========== 初始化背景粒子 ==========
function initParticles() {
    const container = document.querySelector('.bg-particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (5 + Math.random() * 5) + 's';
        container.appendChild(particle);
    }
}

// ========== 显示Toast提示 ==========
function showToast(message, isSuccess) {
    toastIcon.textContent = isSuccess ? '✅' : '❌';
    toastMessage.textContent = message;
    toast.className = 'toast ' + (isSuccess ? 'success' : 'error') + ' show';
    
    if (navigator.vibrate) {
        navigator.vibrate(isSuccess ? [50, 50, 50] : 200);
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// ========== 彩纸效果 ==========
function createConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff6bd6', '#ffa502'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s ease-out forwards`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 60);
    }
}

// ========== 页面导航 ==========
function goToStep(stepId) {
    // 隐藏所有步骤
    Object.values(steps).forEach(step => {
        step.classList.remove('active');
        step.style.display = 'none';
    });
    
    // 显示目标步骤
    const targetStep = steps[stepId];
    targetStep.classList.add('active');
    targetStep.style.display = 'block';
    
    // 重新触发动画
    targetStep.style.animation = 'none';
    targetStep.offsetHeight;
    targetStep.style.animation = 'fadeInUp 0.6s ease-out';
    
    // 更新返回按钮
    updateBackButton(stepId);
}

function updateBackButton(currentStepId) {
    const currentIndex = stepOrder.indexOf(currentStepId);
    
    if (currentIndex > 0) {
        backBtn.style.display = 'block';
        backBtn.onclick = function() {
            goToStep(stepOrder[currentIndex - 1]);
        };
    } else {
        backBtn.style.display = 'none';
    }
}

// ========== 第一步：姓名选择 ==========
function initStep1() {
    const nameButtons = document.querySelectorAll('.name-btn');
    
    nameButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedName = this.getAttribute('data-name');
            
            if (selectedName === CORRECT_NAME) {
                showToast('回答正确！', true);
                this.style.background = 'rgba(46, 213, 115, 0.3)';
                this.style.borderColor = '#2ed573';
                
                setTimeout(() => {
                    goToStep('step2');
                }, 1500);
            } else {
                showToast('回答错误，请重新选择！', false);
                this.classList.add('shake');
                setTimeout(() => {
                    this.classList.remove('shake');
                }, 500);
            }
        });
    });
}

// ========== 第二步：年龄选择 ==========
function initStep2() {
    const ageButtons = document.querySelectorAll('.age-btn');
    
    ageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedAge = this.getAttribute('data-age');
            
            if (selectedAge === CORRECT_AGE) {
                showToast('回答正确！', true);
                this.style.background = 'rgba(46, 213, 115, 0.3)';
                this.style.borderColor = '#2ed573';
                
                setTimeout(() => {
                    goToStep('step3');
                }, 1500);
            } else {
                showToast('回答错误，请重新选择！', false);
                this.classList.add('shake');
                setTimeout(() => {
                    this.classList.remove('shake');
                }, 500);
            }
        });
    });
}

// ========== 第三步：确认页 - 查看惊喜 ==========
function initStep3() {
    const nextBtn = document.getElementById('nextBtn1');
    nextBtn.addEventListener('click', function() {
        createConfetti();
        goToStep('step4');
    });
}

// ========== 第四步：全家福页 - 继续查看 ==========
function initStep4() {
    const nextBtn = document.getElementById('nextBtn2');
    nextBtn.addEventListener('click', function() {
        createConfetti();
        goToStep('step5');
    });
}

// ========== 第六步：红包页 - 重新开始 ==========
function initStep6() {
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', function() {
        goToStep('step1');
    });
}

// ========== 页面加载完成 ==========
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initStep1();
    initStep2();
    initStep3();
    initStep4();
    initStep6();
});
