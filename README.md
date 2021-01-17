# Backend Api Calls

## User related

### 
- Without any authorization


   * Show All Users : `GET /api/user/`
   * Show Specific User : `GET /api/user/:reg_no/`
   * Login User : `POST /api/user/login/`
        ```json
        Request Body
        {
            "email":"useremail@email.com",
            "password":"xxxxxxxx"
        }
        ```

   * Request Password Reset When Password Is Forgotten ( a token will be sent to user email as a param of reset link ): `POST /api/user/password/forgot/`



        ```json
        Request Body
        {
            "email":"useremail@email.com"
        }
        ```


### 
- Authorized And Performed By User Himself

   * Log Out User : `GET /api/user/logout/`

   * Update User Information : `PATCH /api/user/update/`
        ```json
        Request Body (Can Contain Multiple Or Any Of The Listed Field)
        {
            "fb_link": "https://www.facebook.com/username/",
            "linkedin_link": "https://www.linkedin.com/username/",
            "git_link": "https://github.com/username/",
            "phone": "01932981532",
            "date_of_birth": "2000-11-18"
        }
        ```
   * Update User Password : `PATCH /api/user/password/update/`
        ```json
        Request Body
        {
            "oldpassword":"xxxxxxx",
            "newpassword":"yyyyyyy"
        }
        ```
   * Reset User Password  : `PATCH /api/user/password/reset/:token`
        ```json
        Request Body
        {
            "password" : "xxxxxxx"
        }
        ```
   * Request User Email Change ( a token will be sent to new email ): `POST /api/user/email/requestchange/`

        ```json
        Request Body ( with new email )
        {
            "email":"newemail@email.com"
        }
        ```
    * User Email Change : `PATCH /api/user/email/change/`

        ```json
        Request Body
       {
            "password" : "xxxxxxx",
            "token" : "fNx-8VLbU5ncGac.....jwttoken"
        }
        ```


### 
- Authorized By Admin / Superadmin

    * Register New User : `POST /api/user/register/`

        ```json
        Request Body
        {
            "email":"username@email.com",
            "reg_no":"20**831***",
            "name":"certificatename"
        }
        ```
    * Delete User : `DELETE /api/user/:reg_no/`

    * Set An User Admin / Superadmin : `PATCH /api/user/setadmin/`

        ```json
        Request Body
        {
            "reg_no": "20178",
            "role":"admin/superadmin"
        }
        ```
    * Remove An User From Admin / Superadmin : `PATCH /api/user/removeadmin/:reg_no/`
   
### ER Diagram

![ER Diagram for SWE Society Website](documents/others/images/ER_Diagram_SWE_Society.png)
