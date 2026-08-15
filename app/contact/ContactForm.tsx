'use client'

import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
import classes from './Contact.module.css'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (
    e: SubmitEvent<HTMLElement>
  ) => {
    e.preventDefault()

    const newErrors = {
      name: '',
      email: '',
      message: '',
    }

    // お名前
    if (!form.name) {
      newErrors.name = 'お名前を入力してください'
    } else if (form.name.length > 30) {
      newErrors.name = 'お名前は30文字以内で入力してください'
    }

    // メールアドレス
    if (!form.email) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = '正しいメールアドレスを入力してください'
    }

    // 本文
    if (!form.message) {
      newErrors.message = '本文を入力してください'
    } else if (form.message.length > 500) {
      newErrors.message = '本文は500文字以内で入力してください'
    }

    setErrors(newErrors)

    // エラーがあれば送信しない
    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.message
    ) {
      return
    }

    // 送信開始
    setIsSubmitting(true)

    try {
      const res = await fetch(
        'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
          }),
        }
      )

      if (!res.ok) {
        throw new Error('送信に失敗しました')
      }

      alert('送信しました')

      // フォームをクリア
      setForm({
        name: '',
        email: '',
        message: '',
      })

      setErrors({
        name: '',
        email: '',
        message: '',
      })
    } catch (error) {
      console.error(error)
      alert('送信に失敗しました')

    } finally {
      // 送信終了
      setIsSubmitting(false)
    }
  }

  const handleClear = () => {
    setForm({
      name: '',
      email: '',
      message: '',
    })

    setErrors({
      name: '',
      email: '',
      message: '',
    })
  }

  return (
    <div className={classes.contact}>
      <h1 className={classes.contact__title}>
        お問い合わせフォーム
      </h1>

      <form
        className={classes.contact__form}
        onSubmit={handleSubmit}
      >
        <div className={classes.contact__item}>
          <label
            htmlFor="name"
            className={classes.contact__label}
          >
            お名前
          </label>

          <div className={classes['contact__input-wrap']}>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={classes.contact__input}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className={classes.contact__error}>
                {errors.name}
              </p>
            )}
          </div>
        </div>

        <div className={classes.contact__item}>
          <label
            htmlFor="email"
            className={classes.contact__label}
          >
            メールアドレス
          </label>

          <div className={classes['contact__input-wrap']}>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={classes.contact__input}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className={classes.contact__error}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className={classes.contact__item}>
          <label
            htmlFor="message"
            className={classes.contact__label}
          >
            本文
          </label>

          <div className={classes['contact__input-wrap']}>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className={classes.contact__textarea}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className={classes.contact__error}>
                {errors.message}
              </p>
            )}
          </div>
        </div>

        <div className={classes.contact__buttons}>
          <button
            type="submit"
            className={classes.contact__button}
            disabled={isSubmitting}
          >
            送信
          </button>


          <button
            type="button"
            className={classes['contact__button-white']}
            onClick={handleClear}
            disabled={isSubmitting}
          >
            クリア
          </button>
        </div>

      </form>
    </div>
  )
}

export default Contact