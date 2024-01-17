<script setup lang="ts">
import {reactive} from "vue";

interface FormState {
    username: string;
    password: string;
    remember: boolean;
}

const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const appTitle = import.meta.env.APP_TITLE;
</script>

<template>
    <div class="login-container">
        <div class="login-logo"></div>
        <div class="login-form-container">
            <div class="login-form">
                <div class="login-form-title">{{ appTitle }}</div>
                <div class="login-form-subtitle">安全生产运检平台</div>
                <a-form
                    :model="formState"
                    name="basic"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed"
                >
                    <a-form-item
                        label="Username"
                        name="username"
                        :rules="[{ required: true, message: 'Please input your username!' }]"
                    >
                        <a-input v-model:value="formState.username" />
                    </a-form-item>
                    <a-form-item
                        label="Password"
                        name="password"
                        :rules="[{ required: true, message: 'Please input your password!' }]"
                    >
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>

                    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                    </a-form-item>

                    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                        <a-button type="primary" html-type="submit">Submit</a-button>
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
    background-image: url("../assets/images/login/login-bg.png");
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
