        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        // 初始化画布
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = 'round';

        // 设备兼容处理
        function getCanvasPosition(e) {
            const rect = canvas.getBoundingClientRect();
            if (e.touches) {
                return {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top
                };
            }
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }

        // 开始绘画
        function startDrawing(e) {
            isDrawing = true;
            const pos = getCanvasPosition(e);
            [lastX, lastY] = [pos.x, pos.y];
        }

        // 绘画过程
        function draw(e) {
            if (!isDrawing) return;
            e.preventDefault();
            
            const pos = getCanvasPosition(e);
            
            // 设置画笔属性
            ctx.strokeStyle = document.getElementById('colorPicker').value;
            ctx.lineWidth = document.getElementById('brushSize').value;
            
            // 绘制路径
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            
            [lastX, lastY] = [pos.x, pos.y];
        }

        // 事件监听
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);

        // 触摸屏支持
        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', () => isDrawing = false);

        // 清除画布
        function clearCanvas() {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // 保存图像
        function saveCanvas() {
            const link = document.createElement('a');
            link.download = `drawing-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }