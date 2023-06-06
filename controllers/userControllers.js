const bcrypt = require('bcryptjs')

const generateToken = require('../creationToken').generateToken
const db = require('../config/db')
module.exports = {
    addUser: (req, res) => {
        const { lastname, firstname, password, email } = req.body
    
        const userRole = 1
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if(error) {
                console.log(error)
                res.status(500).json({ error: 'Operation failed' })
            } else {
                const newUser = { lastname, firstname, password: hashedPassword, email, role_id: userRole}
                db.query('INSERT INTO USERS SET ?', newUser, (error, result) => {
                    if(error) {
                        console.log(error)
                        res.status(500).json({ error: "La création d'utilisateur échouée" })
                    } else {
                        const user = { id: result.insertId, ...newUser }
                        const token = generateToken(user)
                        res.status(201).json({
                            message: "Création d'utilisateur avec succès",
                            token: token,
                        })
                    }
                })
            }
        })
    
    
    },
    login: (req, res) => {
        const { email, password } = req.body
      
        db.query("SELECT * FROM USER WHERE email = ?", email, (error, results) => {
          if (error) {
            console.log(error)
            res.status(500).json({ error: "Failed to login" })
          } else if (results.length === 0) {
            res.status(401).json({ error: "Invalid email or password" })
          } else {
            const user = results[0]
            bcrypt.compare(password, user.password, (error, isMatch) => {
              if (error) {
                console.log(error)
                res.status(500).json({ error: "Failed to login" })
              } else if (isMatch) {
                const token = generateToken(user)
                res.status(200).json({
                  message: "Login successful",
                  token: token,
                })
              } else {
                res.status(401).json({ error: "Invalid email or password" })
              }
            })
          }
        })
    },
    allUsers: (req, res) => {
        db.query('SELECT * FROM USERS', (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to retrieve users' })
            } else {
                res.status(200).json(results)
            }
        })
    },
    user: (req, res) => {
        const userId = req.params.id
    
        db.query('SELECT * FROM USERS WHERE id = ?', userId, (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to retrieve the user'})
            } else if (results.length === 0) {
                res.status(404).json({ error: 'User not found'})
            } else {
                res.status(200).json(results[0])
            }
        })
    }, 
    updateUser: (req, res) => {
        const userId = req.params.id
        const { name, password, role, email} = req.body
        const updatedUser = { name, password, role, email }
    
        db.query(
            'UPDATE USERS SET ? WHERE id = ?',
            [updatedUser, userId],
            (error, result) => {
                if (error) {
                    console.log(error)
                    res.status(500).json({ error: 'Failed to update the user'})
                } else if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'User not found'})
                } else {
                    res.status(200).json({ message: 'User updated successfully'})
                }
            }
        )
    },
    deleteUser: (req, res) => {
        const userId = req.params.id
    
        db.query('DELETE FROM USER WHERE id = ?', userId, (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to delete the user'})
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'User not found' })
            } else {
                res.status(200).json({ message: 'User deleted successfully' })
            }
        })
    }
}