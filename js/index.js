        document.getElementById('submitFeedback').addEventListener('click', submitFeedback);
        
        function submitFeedback() {
            const feedback = document.getElementById('feedbackInput').value.trim();
            if (feedback) {
                alert('感谢您的反馈！我们会认真考虑。');
                document.getElementById('feedbackInput').value = '';
            } else {
                alert('请输入您的反馈内容。');
            }
        }