import React, { ChangeEvent, Fragment, useCallback, useRef } from 'react'
import MenuButton from '../MenuButton'
import { useEditorState } from '@tiptap/react'
import { useTiptapContext } from '../Provider'

const ImageButton = () => {
    const { editor } = useTiptapContext()
    const state = useEditorState({
        editor,
        selector: ctx => {
            return {
                active: ctx.editor.isActive('image'),
                disabled: !ctx.editor.isEditable,
            }
        },
    })

    const fileInput = useRef<HTMLInputElement>(null)
    const handleClick = useCallback(() => {
        fileInput.current?.click()
    }, [])

    const onUpload = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target
            const file = target.files?.[0]
            if (file?.type.startsWith('image/')) {
                // Use a data URL so the inserted image survives rerenders/navigation.
                const reader = new FileReader()
                reader.onload = () => {
                    const url = reader.result
                    if (typeof url === 'string') {
                        editor.chain().setImage({ src: url }).focus().run()
                    }
                }
                reader.readAsDataURL(file)
            }
        },
        [editor],
    )

    return (
        <Fragment>
            <MenuButton
                icon="Image"
                tooltip="Image"
                {...state}
                onClick={handleClick}
            />
            <input
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={onUpload}
            />
        </Fragment>
    )
}

export default ImageButton
