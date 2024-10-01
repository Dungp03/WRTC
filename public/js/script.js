$(function () {
    const socket = io('http://localhost:3001');
    let username = '';
    let unreadCount = 0;  // Số lượng tin nhắn chưa đọc
    let isChatOpen = false;  // Kiểm tra xem người dùng đã mở phần chat chưa

    // Toggle chat visibility when clicking on the icon
    $('#toggle-message').click(function () {
        $('#message-section').toggle();  // Show or hide the message section
        isChatOpen = !isChatOpen;

        if (isChatOpen) {
            unreadCount = 0;  // Reset số lượng tin nhắn chưa đọc
            $('#unread-count').hide();  // Ẩn số lượng tin nhắn chưa đọc
        }
    });

    // Toggle online user list
    $('#toggle-online-user').click(function () {
        $('#ulUser').toggle();
    });

    // Toggle Your ID section
    $('#toggle-your-id').click(function () {
        $('#your-id-section').toggle();
    });

    // Handle Sign Up
    $('#btnSignUp').click(function() {
        const enteredUsername = $('#txtUsername').val();
        if (enteredUsername.trim() === '') {
            alert('Please enter your username');
            return;
        }
        username = enteredUsername;
        $('#div-dang-ky').hide();  // Hide the sign-up section once the username is set
    });

    // Handle form submission for messages
    $('#messageForm').submit(function(event) {
        event.preventDefault();
        const message = $('#m').val();

        if (username === '') {
            alert('Please enter your username first!');
            return;
        }

        const fullMessage = `${username}: ${message}`;
        socket.emit('chat message', fullMessage);

        $('#m').val('');  // Clear input after sending
    });

    // Listen for chat messages from server
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));

        // Nếu khung chat chưa được mở, tăng số lượng tin nhắn chưa đọc
        if (!isChatOpen) {
            unreadCount++;
            $('#unread-count').text(unreadCount).show();  // Cập nhật và hiển thị số lượng tin nhắn chưa đọc
        }
    });
});
