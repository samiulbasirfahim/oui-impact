import { useState } from "react";
import { useReferModalStoreState } from "@/store/refer-modal-state";
import { RNModal } from "../ui/modal";

function ModalAcceptRefer() { 
    const { isModalOpen, closeModal } = useReferModalStoreState();

    // return <RNModal></RNModal>

}
