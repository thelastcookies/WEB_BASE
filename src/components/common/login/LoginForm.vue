<script setup lang="ts">
import {theme} from 'ant-design-vue';
import type {LoginParams} from "@/api/admin/home/types";
import type {Rule} from "ant-design-vue/es/form";
import {Ref} from "vue";

const {message} = useAppStore();

const loginForm = reactive<LoginParams>({
    userName: '',
    password: '',
    remember: false,
});

const loginFormRules: Record<string, Rule[]> = {
    userName: [{required: true, message: '请输入账号', trigger: 'blur'}],
    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
};

const loginFormRef = ref(null) as Ref<Element | null>;
const usernameRef = ref(null) as Ref<Element | null>;
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
    }).catch(() => {
        message.error({
            content: '登录失败！',
            key: LOGIN_LOADING_KEY,
        });
    });
};

// 获取 theme 中的颜色配置，用于 input label
const {useToken} = theme;
const {token} = useToken();
const {colorTextQuaternary, colorPrimaryHover, colorErrorText} = token.value;

// 用于保存 input label 的状态颜色值
let userNameActiveColor = colorPrimaryHover;
let passwordActiveColor = colorPrimaryHover;

const userNameLabelStyle = ref({
    top: '16.5px',
    color: colorTextQuaternary,
    fontSize: '18px',
    zIndex: 0,
});

const passwordLabelStyle = ref({
    top: '16.5px',
    color: colorTextQuaternary,
    fontSize: '18px',
    zIndex: 0,
});

/**
 * 改变各字段高亮色
 * @param name
 * @param status
 */
const handleValidate = (name: string | number | string[] | number[], status: boolean) => {
    if (name === 'userName') {
        userNameActiveColor = status ? colorPrimaryHover : colorErrorText;
    } else if (name === 'password') {
        passwordActiveColor = status ? colorPrimaryHover : colorErrorText;
    }
};

/**
 * mouseenter 且输入框内有内容时，改变 input label 的颜色为高亮色
 * @param e
 */
const handleInputMEnter = (e: Event) => {
    const domId = (e.target as Element).id;
    if (domId === 'userName' && loginForm.userName !== '') {
        userNameLabelStyle.value.color = userNameActiveColor;
    } else if (domId === 'password' && loginForm.password !== '') {
        passwordLabelStyle.value.color = passwordActiveColor;
    }
};

/**
 * hover 且输入框内有内容时，改变 input label 的颜色为高亮色
 * @param e
 */
const handleInputMLeave = (e: Event) => {
    if (document.activeElement === e.target) return;
    const domId = (e.target as Element).id;
    if (domId === 'userName' && loginForm.userName !== '') {
        userNameLabelStyle.value.color = colorTextQuaternary;
    } else if (domId === 'password' && loginForm.password !== '') {
        passwordLabelStyle.value.color = colorTextQuaternary;
    }
};

/**
 * focus 时 label 从 placeholder 变为悬浮样式
 * @param e
 */
const handleInputFocus = (e: Event) => {
    const domId = (e.target as Element).id;
    if (domId === 'userName') {
        userNameLabelStyle.value.color = userNameActiveColor;
        userNameLabelStyle.value.top = '-10.5px';
        userNameLabelStyle.value.fontSize = '14px';
        userNameLabelStyle.value.zIndex = 1;
    } else if (domId === 'password') {
        passwordLabelStyle.value.color = passwordActiveColor;
        passwordLabelStyle.value.top = '-10.5px';
        passwordLabelStyle.value.fontSize = '14px';
        passwordLabelStyle.value.zIndex = 1;
    }
};

/**
 * blur 时 label 保持悬浮样式不变，或从悬浮样式变为 placeholder
 * @param e
 */
const handleInputBlur = (e: Event) => {
    const domId = (e.target as Element).id;
    if (domId === 'userName') {
        userNameLabelStyle.value.color = colorTextQuaternary;
        if (loginForm.userName === '') {
            userNameLabelStyle.value.top = '16.5px';
            userNameLabelStyle.value.fontSize = '18px';
            userNameLabelStyle.value.zIndex = 0;
        }
    } else if (domId === 'password') {
        passwordLabelStyle.value.color = colorTextQuaternary;
        if (loginForm.password === '') {
            passwordLabelStyle.value.top = '16.5px';
            passwordLabelStyle.value.fontSize = '18px';
            passwordLabelStyle.value.zIndex = 0;
        }
    }
};

</script>

<template>
    <div class="form-container w-400px m-center">
        <div class="form-title line-height-12 font-700 letter-spacing--1.6px">登录</div>
        <div class="form-subtitle mt-3">请登录以使用本系统</div>
        <a-form
            mt-8
            name="login"
            ref="loginFormRef"
            :model="loginForm"
            autocomplete="off"
            :rules="loginFormRules"
            @validate="handleValidate"
            @finish="handleSubmitLogin"
        >
            <a-form-item relative name="userName">
                <a-input
                    id="userName"
                    ref="usernameRef"
                    class="login-input transparent z-1"
                    v-model:value="loginForm.userName"
                    @mouseenter="handleInputMEnter"
                    @mouseleave="handleInputMLeave"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                />
                <div class="form-label absolute left-12.5px p-lr-4px" :style="userNameLabelStyle">账号</div>
            </a-form-item>
            <a-form-item name="password">
                <a-input-password
                    id="password"
                    class="login-input transparent z-1"
                    v-model:value="loginForm.password"
                    @mouseenter="handleInputMEnter"
                    @mouseleave="handleInputMLeave"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                />
                <div class="form-label absolute left-12.5px p-lr-4px" :style="passwordLabelStyle">密码</div>
            </a-form-item>
            <a-form-item class="mb-20px">
                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="loginForm.remember">记住密码</a-checkbox>
                </a-form-item>
            </a-form-item>
            <a-form-item class="m-0">
                <a-button login-btn type="primary" html-type="submit">登录</a-button>
            </a-form-item>
            <a-divider>或</a-divider>
            <a-form-item class="m-0">
                <a-button login-btn>注册账号</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<style scoped lang="less">
.form-container {
    .form-title {
        font-size: ~'@{fontSizeHeading1}px';
    }

    .form-subtitle {
        font-size: ~'@{fontSizeLG}px';
        color: @colorTextSecondary;
    }

    .ant-input-password {
        //padding: 0;
        ::v-deep(.ant-input) {
            //padding: 16px;
            background-color: transparent;
        }
    }

    .ant-form-item {
        ::v-deep(.ant-form-item-explain-error) {
            text-align: right;
        }
    }

    .form-label {
        transition-duration: @motionDurationMid;
        background-color: @colorBgContainer;
    }

    .ant-checkbox-wrapper {
        :deep(.ant-checkbox-inner) {
            border: 2px solid @colorBgSpotlight;
        }
    }

    .ant-divider {
        border-top-color: @colorBorder;
    }
}
</style>
