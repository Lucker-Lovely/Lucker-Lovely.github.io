        // 获取元素
        const messageInput = document.getElementById('messageInput');
        const messagesContainer = document.getElementById('messagesContainer');

        // 存储留言列表
        let messages = JSON.parse(localStorage.getItem('comments')) || [];

        // 加载保存的留言
        loadMessages();

        // 发送留言函数
        function sendMessage() {
            const message = messageInput.value.trim();
            
            if (message) {
                // 获取当前时间戳
                const timestamp = new Date().toLocaleString();
                
                const username = prompt('请输入你的名字或昵称:');
                
                if (!username) return;
                
                messages.push({
                    username,
                    content: message,
                    timestamp
                });

                // 保存到localStorage
                localStorage.setItem('comments', JSON.stringify(messages));
                
                // 添加新消息到页面上
                addMessage(username, message, timestamp);
                messageInput.value = '';
            }
        }

        function addMessage(username, content, timestamp) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="username">${username}:</div>
                    <p>${content}</p>
                    <span class="timestamp">${timestamp}</span>
                </div>
            `;
            
            // 将新消息添加到顶部
            messagesContainer.insertBefore(messageDiv, messagesContainer.firstChild);
        }

        function loadMessages() {
            messages.forEach(msg => {
                addMessage(msg.username, msg.content, msg.timestamp);
            });
        }

        // 回车键发送
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
  //导出
function exportMessage() {
    // 从 localStorage 中获取保存的留言数据（使用正确的键名 'comments'）
    const savedMessages = JSON.parse(localStorage.getItem('comments')) || [];
    
    if (savedMessages.length === 0) {
        alert('暂无留言可导出！');
        return;
    }

    // 格式化留言内容为易读的文本格式
    let exportContent = '留言导出\n\n';
    savedMessages.forEach((msg, index) => {
        exportContent += `留言 ${index + 1}:\n`;
        exportContent += `用户名: ${msg.username}\n`;
        exportContent += `内容: ${msg.content}\n`;
        exportContent += `时间: ${msg.timestamp}\n\n`;
    });

    // 创建 Blob 对象（文本格式）
    const blob = new Blob([exportContent], { type: 'text/plain' });
    
    // 生成临时下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // 设置文件名（带时间戳）
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', '_');
    a.download = `message_export_${timestamp}.txt`;
    
    // 触发下载
    document.body.appendChild(a);
    a.click();
    
    // 清理资源
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
