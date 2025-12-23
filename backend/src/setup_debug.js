const setup = async () => {
    try {
        const timestamp = Date.now();
        const staffEmail = `staff_debug_${timestamp}@test.com`;
        
        // 1. Register Staff
        let res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Debug Staff', email: staffEmail, password: 'password', role: 'Staff' })
        });
        const staffCmd = await res.json();
        
        // 2. Register User & Create Complaint
        const userEmail = `user_debug_${timestamp}@test.com`;
        res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Debug User', email: userEmail, password: 'password', role: 'User' })
        });
        const userCmd = await res.json();
        
        res = await fetch('http://localhost:3000/api/complaints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-user-id': userCmd.userId, 'x-user-role': 'User' },
            body: JSON.stringify({ title: 'Debug Task', description: 'Click test', category: 'General' })
        });
        const compCmd = await res.json();

        // 3. Assign to Staff (As Admin)
        await fetch(`http://localhost:3000/api/complaints/${compCmd.id}/assign`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'x-user-id': '999', 'x-user-role': 'Admin' }, // Pseudo admin
            body: JSON.stringify({ staff_id: staffCmd.userId })
        });

        console.log(JSON.stringify({ email: staffEmail, password: 'password' }));

    } catch (e) { console.error(e); }
};
setup();
