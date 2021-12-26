module.exports = mongoose => {
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          fname: String,
          lname: String,
          email: {
            type: String,
            required: true, 
            unique: true,
            dropDups: true
          }, 
          phone_num: {
            type: String,
            match: [/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm, 'Please use a valid phone number']
          }
        },
        { 
          timestamps: true 
        }
      )
    );
  
    return User;
  };