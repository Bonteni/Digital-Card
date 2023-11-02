document.addEventListener('DOMContentLoaded', function() {
    // Wait for 2 seconds (2000 milliseconds) after page load
    setTimeout(function() {
        // Check if the Web NFC API is available
        if ("NDEFReader" in window) {
            // Create an NDEF reader instance
            const reader = new NDEFReader();

            // Start scanning for NFC tags
            reader.scan().then(() => {
                console.log("NFC reader started successfully.");
                
                // Add event listener for tag reading
                reader.onreading = event => {
                    // Extract NFC data
                    const rfidCode = event.message.records[0].data;

                    // Convert NFC data to a string (assuming it's stored as text)
                    const rfidString = new TextDecoder().decode(rfidCode);

                    // Check if the scanned RFID code matches the desired code
                    if (rfidString.trim() === '0003453733') {
                        // Redirect to Attendance Marked page
                        window.location.href = 'attendance-marked.html';
                    }
                };
            }).catch(error => {
                console.error(`Error: ${error}`);
            });
        } else {
            console.log("Web NFC API is not supported on this device.");
        }

        // Handle RFID input from external RFID readers
        document.addEventListener('input', function(event) {
            const rfidInput = event.target;

            // Check if the entered RFID code matches the desired code
            if (rfidInput.id === 'rfidInput' && rfidInput.value.trim() === '0003453733') {
                // Redirect to Attendance Marked page
                window.location.href = 'attendance-marked.html';
            }
        });

        // Automatically activate the RFID input field
        const rfidInput = document.getElementById('rfidInput');
        rfidInput.focus();
    }, 2000); // Wait for 2 seconds (2000 milliseconds) after page load to initialize and redirect
});
