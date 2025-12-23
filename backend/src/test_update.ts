import axios from 'axios';

const testUpdate = async () => {
    try {
        // 1. Login as Staff
        // We need to know a valid staff ID. Let's assume ID 3 (Technician 1).
        // Since we don't have login credentials for a specific staff easily, let's Register one.
        
        const timestamp = Date.now();
        const email = `test_staff_${timestamp}@test.com`;
        
        console.log(`Registering staff: ${email}`);
        const regRes = await axios.post('http://localhost:3000/api/users/register', {
             name: 'Test Staff',
             email: email,
             password: 'password',
             role: 'Staff'
        });
        const staffId = regRes.data.userId;
        console.log(`Staff registered. ID: ${staffId}`);

        // 2. Register User and Create Complaint
        const userEmail = `test_user_${timestamp}@test.com`;
        console.log(`Registering user: ${userEmail}`);
        const userRes = await axios.post('http://localhost:3000/api/users/register', {
             name: 'Test User',
             email: userEmail,
             password: 'password',
             role: 'User'
        });
        const userId = userRes.data.userId;
        
        console.log('Creating complaint...');
        const compRes = await axios.post('http://localhost:3000/api/complaints', {
            title: 'Test Issue', description: 'Fix me', category: 'General'
        }, { headers: { 'x-user-id': userId, 'x-user-role': 'User' } });
        const complaintId = compRes.data.id;
        console.log(`Complaint created. ID: ${complaintId}`);

        // 3. Update Status (Failing part)
        console.log('Attempting UPDATE status to In-progress...');
        await axios.put(`http://localhost:3000/api/complaints/${complaintId}/status`, {
            status: 'In-progress',
            resolution_notes: ''
        }, { headers: { 'x-user-id': staffId, 'x-user-role': 'Staff' } });
        
        console.log('SUCCESS: Status updated to In-progress');

    } catch (error: any) {
        console.error('FAILURE:', error.response ? error.response.data : error.message);
    }
};

testUpdate();
