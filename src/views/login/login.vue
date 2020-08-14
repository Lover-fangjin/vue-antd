<template>
  <div class="login-wrap">
    <div class="form login">
      <div class="logo">
        <span>城市级智慧停车管理平台</span>
      </div>
      <a-form :model="user" status-icon :rules="rules" ref="user" label-width="100px">
        <a-form-item prop="username">
          <a-input
            size="small"
            type="input"
            v-model="user.username"
            autocomplete="off"
            placeholder="用户名/手机"
          ></a-input>
        </a-form-item>
        <a-form-item prop="password">
          <a-input
            size="small"
            type="password"
            v-model="user.password"
            autocomplete="off"
            placeholder="密码"
          ></a-input>
        </a-form-item>

        <span class="login-wrap-content-from-forget">
          <a-checkbox v-model="remember">记住密码</a-checkbox>
        </span>
        <a-form-item>
          <a-button type="primary" size="small" @click="onLogin">
            提交
            <i v-if="loginLoading" class="el-icon-loading" />
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { debuglog } from "util";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.password !== "") {
          this.$refs.user.validateField("checkPass");
        }
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
      remember: true,
      loginLoading: false,
    };
  },
  methods: {
    login(formName) {
      let me = this;
      me.$refs[formName].validate((valid) => {
        if (valid) {
          me.$router.push("/home");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onLogin() {
      let me = this;
      me.$router.push("/home");
      return
      var loginParams = {
        username: me.user.username,
        password: me.user.password,
      };
      me.$refs.user.validate((valid) => {
        if (valid) {
          me.loginLoading = true;
          me.$api
            .login(loginParams)
            .then((res) => {
              me.loginLoading = false;
              if (res.code === 200) {
                localStorage.setItem("isLogin", true);
                if (me.remember) {
                  localStorage.setItem("user", JSON.stringify(res.result));
                } else {
                  localStorage.removeItem("user");
                }
                me.$message({
                  message: "登录成功",
                  type: "success",
                  duration: config.duration,
                });
                sessionStorage.setItem(
                  "token",
                  "8Tze3_nYY8bQkR2WYaMbqqgozfA0N-vl"
                );
                me.$router.push("/home");
              }
            })
            .catch((err) => {
              me.loginLoading = false;
              me.$message({
                message: err,
                type: "error",
                duration: config.duration,
              });
            });
        }
      });
    },
    clear() {
    },
  },
  mounted() {
    let me = this;
    // me.onLogin();
    var loginuser = localStorage.getItem("user");
    loginuser = JSON.parse(loginuser);
    if (loginuser !== null) {
      me.remember = true;
      me.user.username = loginuser.username;
      me.user.password = loginuser.password;
    }
  },
  destroyed() {
    this.clear();
  },
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100vh;
  background: @siderbarBgColor;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  .login {
    background: #fafafac2;
    .el-form-item__content {
      margin-left: 0px !important;
    }
    .el-input__inner {
      background: #fff !important;
      color: #666 !important;
      height: 30px !important;
      text-align: left !important;
      border: 1px solid #ccc !important;
    }
  }
}
</style>


<style lang="less" scoped>
.form {
  position: absolute;
  top: 45%;
  left: 50%;
  margin: -160px 0 0 -160px;
  width: 400px;
  height: 350px;
  padding: 40px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);

  button {
    width: 100%;
  }

  p {
    color: rgb(204, 204, 204);
    text-align: center;
    margin-top: 16px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
}

.logo {
  text-align: center;
  cursor: pointer;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    margin-right: 8px;
    background-color: cornflowerblue;
    border-radius: 30px;
  }

  span {
    vertical-align: text-bottom;
    font-size: 21px;
    text-transform: uppercase;
    display: inline-block;
    font-weight: 600;
    background-image: -webkit-gradient(
      linear,
      37.219838% 34.532506%,
      36.425669% 93.178216%,
      from(#29cdff),
      to(#0a60ff),
      color-stop(0.37, #148eff)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.login-wrap-content-from-forget {
  display: block;
  margin: auto;
  height: 36px;
  color: #8492a6;
  font-size: 12px;
  text-align: left;
  .el-checkbox__label {
    color: #8492a6;
    font-size: 12px;
  }
}
</style>