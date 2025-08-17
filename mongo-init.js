db.createUser({
    user:'user',
    pwd: 'user',
    roles: [
        {
            role:'readWrite',
            db:'control_node_db'
        }
    ]
})