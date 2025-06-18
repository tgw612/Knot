import { Spring } from "@follow/components/constants/spring.js"
import { useMobile } from "@follow/components/hooks/useMobile.js"
import { Folo } from "@follow/components/icons/folo.js"
import { Logo } from "@follow/components/icons/logo.js"
import { MotionButtonBase } from "@follow/components/ui/button/index.js"
import { Divider } from "@follow/components/ui/divider/Divider.js"
import { useIsDark } from "@follow/hooks"
import type { LoginRuntime } from "@follow/shared/auth"
import { stopPropagation } from "@follow/utils/dom"
import { cn } from "@follow/utils/utils"
import { m } from "motion/react"
import { useState } from "react"
import { Trans, useTranslation } from "react-i18next"

import { useCurrentModal, useModalStack } from "~/components/ui/modal/stacked/hooks"
import { loginHandler } from "~/lib/auth"
import { handleSessionChanges } from "~/queries/auth"
import { useAuthProviders } from "~/queries/users"

import { LoginWithPassword, RegisterForm } from "./Form"
import { LegalModalContent } from "./LegalModal"
import { TokenModalContent } from "./TokenModal"

interface LoginModalContentProps {
  runtime: LoginRuntime
  canClose?: boolean
}

export const LoginModalContent = (props: LoginModalContentProps) => {
  const modal = useCurrentModal()
  const { present } = useModalStack()

  const { canClose = true, runtime } = props

  const { t } = useTranslation()
  const { data: authProviders, isLoading } = useAuthProviders()

  const isMobile = useMobile()

  const providers = Object.entries(authProviders || [])

  const [isRegister] = useState(true)
  const [isEmail, setIsEmail] = useState(false)

  const handleOpenLegal = (type: "privacy" | "tos") => {
    present({
      id: `legal-${type}`,
      title: type === "privacy" ? t("login.privacy") : t("login.terms"),
      content: () => <LegalModalContent type={type} />,
      resizeable: true,
      clickOutsideToDismiss: true,
      max: true,
    })
  }

  const handleOpenToken = () => {
    present({
      id: "token",
      title: t("login.enter_token"),
      content: () => <TokenModalContent />,
    })
  }

  const isDark = useIsDark()

  const Inner = (
    <>
      <div className="-mt-9 mb-4 flex items-center justify-center">
        <Logo className="size-16" />
      </div>
      <div className="mb-6 mt-4 flex items-center justify-center text-center">
        <span className="text-3xl">
          {isRegister ? t("signin.sign_up_to") : t("signin.sign_in_to")}
        </span>
        <Folo className="ml-2 size-14" />
      </div>

      {isEmail ? (
        isRegister ? (
          <RegisterForm />
        ) : (
          <LoginWithPassword runtime={runtime} />
        )
      ) : (
        <div className="mb-3 flex flex-col items-center justify-center gap-4">
          {isLoading
            ? // Skeleton loaders to prevent CLS
              Array.from({ length: 4 })
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-material-ultra-thick border-material-medium relative h-12 w-full animate-pulse rounded-xl border"
                  />
                ))
            : providers.map(([key, provider]) => (
                <MotionButtonBase
                  key={key}
                  onClick={() => {
                    if (key === "credential") {
                      setIsEmail(true)
                    } else {
                      loginHandler(key, "app")
                    }
                  }}
                  className="center hover:bg-material-medium relative w-full gap-2 rounded-xl border py-3 pl-5 font-semibold duration-200"
                >
                  <img
                    className={cn(
                      "absolute left-9 h-5",
                      !provider.iconDark64 &&
                        "dark:brightness-[0.85] dark:hue-rotate-180 dark:invert",
                    )}
                    src={isDark ? provider.iconDark64 || provider.icon64 : provider.icon64}
                  />
                  <span>{t("login.continueWith", { provider: provider.name })}</span>
                </MotionButtonBase>
              ))}

          <div className="text-text-secondary -mb-1.5 mt-1 text-center text-xs leading-4">
            <a onClick={() => handleOpenToken()} className="hover:underline">
              {t("login.enter_token")}
            </a>
          </div>
          <div className="text-text-secondary text-center text-xs leading-4">
            <span>{t("login.agree_to")}</span>{" "}
            <a onClick={() => handleOpenLegal("tos")} className="text-accent hover:underline">
              {t("login.terms")}
            </a>{" "}
            &{" "}
            <a onClick={() => handleOpenLegal("privacy")} className="text-accent hover:underline">
              {t("login.privacy")}
            </a>
          </div>
        </div>
      )}

      <Divider className="mb-5 mt-4" />
      <div className="flex items-center justify-center pb-2">
        <MotionButtonBase
          key="okx"
          onClick={async () => {
            try {
              // @ts-ignore
              const okxProvider = window.okxwallet?.solana
              if (!okxProvider) {
                throw new Error("未检测到 OKX Web3 钱包，请先安装或打开钱包插件。")
              }
              const resp = await okxProvider.connect()
              if (resp && resp.publicKey) {
                // 这里可以将 publicKey 作为用户唯一标识，进行后续登录逻辑
                // TODO: 你可以在此处调用 loginHandler 或自定义登录逻辑
                alert(`OKX 钱包连接成功，公钥：${resp.publicKey}`)
                handleSessionChanges()
              }
            } catch (e) {
              alert(`OKX 钱包连接失败：${e}`)
            }
          }}
          className="center hover:bg-material-medium relative w-full gap-2 rounded-xl border p-2.5 pl-5 font-semibold duration-200"
        >
          <img
            className="absolute left-9 h-5"
            style={{ color: "#0f8fff" }}
            src="https://static.okx.com/cdn/wallet/logo_okxwallet.svg"
          />
          <span>使用 OKX 钱包登录</span>
        </MotionButtonBase>
      </div>
    </>
  )
  if (isMobile) {
    return Inner
  }

  return (
    <div className="center flex h-full" onClick={canClose ? modal.dismiss : undefined}>
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={Spring.presets.snappy}
      >
        <div
          onClick={stopPropagation}
          tabIndex={-1}
          className="bg-background w-[26rem] rounded-xl border p-3 px-8 shadow-2xl shadow-stone-300 dark:border-neutral-700 dark:shadow-stone-800"
        >
          {Inner}
        </div>
      </m.div>
    </div>
  )
}
