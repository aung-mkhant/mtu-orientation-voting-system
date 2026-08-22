module.exports = (DataTypes) => ({
  number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue(value.toLowerCase())
    },
    validate: {
      isIn: {
        args: [["male", "female"]],
        msg: "Gender must be either 'male' or 'female'",
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  major: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const rawPath = $this.getDataValue("imagePath")
      if (!rawPath) return
      const genderValue = this.getDataValue("gender")
      return `/uploads/${genderValue}s/${rawPath}`
    },
  },
})
