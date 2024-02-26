<script setup lang="ts">
import type {LoginParams} from "@/api/admin/home/types";
import type {Rule} from "ant-design-vue/es/form";

const appTitle = import.meta.env.APP_TITLE;

const { message } = useAppStore();

const loginForm = reactive<LoginParams>({
    userName: '',
    password: '',
});

const loginFormRules: Record<string, Rule[]> = {
    userName: [{required: true, message: '请输入用户名!', trigger: 'blur'}],
    password: [{required: true, message: '请输入密码!', trigger: 'blur'}],
};

const loginFormRef = ref();
const handleSubmitLogin = async (formData: LoginParams) => {
    message.loading({
        content: '正在登录中，请稍候。',
        key: LOGIN_LOADING_KEY,
        duration: 0,
    });
    login(formData).then(res => {
        if (res.Success) {
            const tokenRes = res.Data;
            const {setToken} = useTokenStore();
            setToken(tokenRes);
            message.success({
                content: '登录成功。',
                key: LOGIN_LOADING_KEY,
            });
            router.push("/");
        } else {
            message.error({
                content: res.Msg,
                key: LOGIN_LOADING_KEY,
            });
        }
    }).catch(e => {
        message.error({
            content: '登录失败！',
            key: LOGIN_LOADING_KEY,
        });
    });
};
</script>

<template>
    <div class="login-container">
        <div class="login-logo"></div>
        <div class="login-form-container">
            <div class="login-form">
                <div class="login-form-title">{{ appTitle }}</div>
                <div class="login-form-subtitle">安全生产运检平台</div>
                <a-form
                    ref="loginFormRef"
                    :model="loginForm"
                    name="basic"
                    :rules="loginFormRules"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                    @finish="handleSubmitLogin"
                >
                    <a-form-item label="用户名" name="userName">
                        <a-input v-model:value="loginForm.userName"/>
                    </a-form-item>
                    <a-form-item label="密码" name="password">
                        <a-input-password v-model:value="loginForm.password"/>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                        <a-button type="primary" html-type="submit">登录</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.login-container {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/login/login-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    .login-logo {
        width: 580px;
        height: 175px;
        //background-image: url("../assets/images/login-logo.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .login-form-container {
        width: 100%;
        height: calc(100% - 175px);
        display: flex;
        align-items: center;
    }

    .login-form {
        width: 500px;
        height: 480px;
        background-color: @colorBgContainer;
        outline: 1px solid @colorPrimaryBorder;
        outline-offset: -8px;
        margin-left: 200px;
        padding: 35px 50px;
        box-sizing: border-box;

        .login-form-title {
            font-size: 26px;
            font-weight: 500;
            color: @colorText;
            text-align: center;
            letter-spacing: 2px;
        }

        .login-form-subtitle {
            font-size: 17px;
            font-weight: 500;
            color: @colorTextSecondary;
            text-align: center;
            margin-top: 10px;
        }

        .form {
            margin-top: 60px;

        }

        .base-btn {
            width: 400px;
            height: 40px;
        }
    }
}
</style>
