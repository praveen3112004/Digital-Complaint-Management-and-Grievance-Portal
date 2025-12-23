const testUpdate = async () => {
    try {
        const timestamp = Date.now();
        const email = `test_staff_${timestamp}@test.com`;
        
        console.log(`Registering staff: ${email}`);
        let res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Staff', email, password: 'password', role: 'Staff' })
        });
        const staffData = await res.json();
        const staffId = staffData.userId;
        console.log(`Staff registered. ID: ${staffId}`);

        const userEmail = `test_user_${timestamp}@test.com`;
        res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test User', email: userEmail, password: 'password', role: 'User' })
        });
        const userData = await res.json();
        const userId = userData.userId;

        console.log('Creating complaint...');
        res = await fetch('http://localhost:3000/api/complaints', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-user-id': userId.toString(), 
                'x-user-role': 'User' 
            },
            body: JSON.stringify({ title: 'Test Issue', description: 'Fix me', category: 'General' })
        });
        const compData = await res.json();
        const complaintId = compData.id;
        console.log(`Complaint created. ID: ${complaintId}`);

        console.log('Attempting UPDATE status to In-progress...');
        res = await fetch(`http://localhost:3000/api/complaints/${complaintId}/status`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'x-user-id': staffId.toString(), 
                'x-user-role': 'Staff' 
            },
            body: JSON.stringify({ status: 'In-progress', resolution_notes: '' })
        });
        
        const updateData = await res.json();
        if (res.ok) {
            console.log('SUCCESS: Status updated to In-progress');
        } else {
            console.log('FAILURE:', updateData);
        }

    } catch (error) {
        console.error('SCRIPT ERROR:', error);
    }
};

testUpdate();
