import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  deleteCustomerByName,
  fetchCustomersPaginated,
} from "../../utils/function/function";
import BottomNav from "../../components/nav/navBar/BottomNav";
import Icon from "../../components/SVG/Icon";
import ClientDetail from "../../components/clients/ClientDetail";
import { Customer } from "../../types/customer";
import { useSwipeable } from "react-swipeable";
import AddCustomerModal from "../../components/modals/Clients/AddCustomerModal";
import { usernameRegex } from "../../utils/regex/regex";
import Loader from "../../components/loader/Loader";
import { useGlobalContext } from "../../context/globalContext";
import ValidationModal from "../../components/modals/ValidationModal.tsx/ValidationModal";
import { useNotifications } from "../../context/NotificationsContext";

function Clients() {
  const dispatch = useAppDispatch();
  const { customers, totalCustomers } = useAppSelector(
    (state) => state.customers
  );

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLHeadingElement>(null);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [inputError, setInputError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const { isAdminPanel } = useGlobalContext();
  const [selectedName, setSelectedName] = useState<string>("");
  const { addNotification } = useNotifications();

  useEffect(() => {
    
    if (searchQuery !== "") {
      setLimit(100);
    } 

    const getCustomers = async () => {
      try {
        await fetchCustomersPaginated(dispatch, limit, offset, searchQuery);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    getCustomers();
  }, [dispatch, offset, limit, searchQuery]);

  const handleRef = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoadMore = () => {
    if (offset + limit < totalCustomers) {
      setOffset((prev) => prev + limit);
    }
    setShowDetailCard(false);
    handleRef();
  };

  const handleLoadLess = () => {
    setOffset((prev) => Math.max(0, prev - limit));
    setShowDetailCard(false);
    handleRef();
  };

  const handleDetailCard = (id: string) => {
    const customer = customers.find((customer) => customer.Id === id);
    setSelectedCustomer(customer as Customer);
    setShowDetailCard(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (usernameRegex(inputValue) || inputValue === "") {
      setSearchQuery(inputValue);
      setShowDetailCard(false);
      handleRef();
      setInputError("");
    } else {
      setInputError(
        "Entrée invalide : seuls les caractères alphanumériques sont autorisés."
      );
      setTimeout(() => {
        setInputError("");
      }, 2000);
    }
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value));
    setShowDetailCard(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isFocused]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowAddCustomerModal(true);
    },
    onSwipedRight: () => {
      setShowAddCustomerModal(true);
    },
    touchEventOptions: { passive: false },
    trackMouse: true,
  });

  const handleDelete = (name: string) => {
    setSelectedName(name);
    setShowValidationModal(true);
  };

  const onConfirm = async () => {
    console.log("Deleting customer:", selectedName);
    if (selectedName) {
      try {
        const result = await deleteCustomerByName(selectedName);
        if (result.ok) {
          addNotification({
            message: "Client supprimé avec succès!",
            type: "Success",
            bgColor: "green-800",
            textColor: "white",
            icon: "check",
            iconColor: "white",
            deny: () => console.log("Notification fermée"),
            width: "w-9/10",
            position: "top-center",
          });
        } else {
          addNotification({
            message: "Erreur lors de la suppression du client!",
            type: "Error",
            bgColor: "red-500",
            textColor: "white",
            icon: "error",
            iconColor: "red",
            deny: () => console.log("Notification fermée"),
            width: "w-9/10",
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Failed to delete customer:", error);
        addNotification({
          message: "Erreur lors de la suppression du client!",
          type: "Error",
          bgColor: "red-500",
          textColor: "white",
          icon: "error",
          iconColor: "red",
          deny: () => console.log("Notification fermée"),
          width: "w-9/10",
          position: "top-center",
        });
      }
    }
    setShowValidationModal(false);
    window.location.reload();
  };

  const onCancel = () => {
    setShowValidationModal(false);
  };


  return (
    <>
      {showAddCustomerModal && (
        <AddCustomerModal onClose={() => setShowAddCustomerModal(false)} />
      )}
      <div
        className={`w-screen h-screen flex flex-col items-center  ${
          showAddCustomerModal ? "opacity-5 bg-black" : "bg-gray-light2"
        }`}
      >
        {/*-------------------------------------------------------------------------------------------------- Recherche / Load +/- ------------------------------------------------------*/}
        <div className="w-10/10 h-1.5/10 flex flex-row justify-center items-center border-b-4 border-gray-600">
          <div className="w-full h-full flex flex-row items-center justify-center gap-4">
            <div className="h-full content-center">
              <Icon
                type="chevron_left"
                className=" text-3xl z-45 border-1 border-black bg-white-perso rounded-full"
                onClick={handleLoadLess}
              />
            </div>
            <div className="flex flex-col gap-2 w-7/10">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Recherche..."
                className="text-center"
                onFocus={handleFocus}
              />
              <select
                value={limit}
                onChange={handleLimitChange}
                className="text-center"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div
              className={`h-full content-center ${
                offset + limit >= totalCustomers ? "hidden" : ""
              }`}
            >
              {offset + limit < totalCustomers && (
                <Icon
                  type="chevron_right"
                  className="text-3xl z-45 border-1 border-black bg-white-perso rounded-full"
                  onClick={handleLoadMore}
                />
              )}
            </div>
          </div>
        </div>

        {/*-------------------------------------------------------------------------------------------------- Liste des clients ------------------------------------------------------*/}
        <div
          className={`w-screen lg:w-8/10 h-8/10 text-sm border-b-2 border-gray-strong bg-white-perso2 overflow-auto flex flex-col items-center justify-start gap-2 `}
          {...handlers}
        >
          <div ref={inputRef}></div>
          {loading ? (
            <Loader />
          ) : inputError ? (
            <div className="text-red-500 mt-56 font-bold text-center ">
              {inputError}
            </div>
          ) : (
            <>
              {/*-------------------------------------------------------------------------------------------------- Detail component ------------------------------------------------------*/}
              {showDetailCard && selectedCustomer ? (
                <ClientDetail
                  customer={selectedCustomer}
                  onClose={() => setShowDetailCard(false)}
                />
              ) : (
                customers.map((customer, index) => (
                  //?-------------------------------------------------------------------------------------------------- Liste des clients BASE --------------------------------------------------------------------*/
                  <div className="w-full h- flex flex-col justify-start items-center">
                    <div
                      key={`${customer.Id}-${index}`}
                      className="min-w-9.5/10 max-w-9.5/10 flex justify-between border-b-1 p-1 border-gray-pers bg-white-perso min-h-14 items-center gap-2 font-merriweather"
                    >
                      <div className="w-5/10 overflow-auto font-semibold">
                        {customer.Name}
                      </div>
                      <div className="text-xs w-4/10 overflow-auto">
                        {customer.MainDeliveryContact_CellPhone && (
                          <a
                            href={`tel:${customer.MainDeliveryContact_CellPhone}`}
                            title={`Appeler ${customer.Name}`}
                            className="flex items-center gap-1"
                          >
                            <Icon
                              type="phone"
                              theme="green"
                              className="text-sm"
                            />
                            <div>{customer.MainDeliveryContact_CellPhone}</div>
                          </a>
                        )}
                        {customer.MainDeliveryContact_Phone && (
                          <a
                            href={`tel:${customer.MainDeliveryContact_Phone}`}
                            title={`Appeler ${customer.Name}`}
                            className="flex items-center gap-1"
                          >
                            <Icon
                              type="phone"
                              theme="green"
                              className="text-sm"
                            />
                            <div className="">
                              {customer.MainDeliveryContact_Phone}
                            </div>
                          </a>
                        )}
                      </div>
                      <Icon
                        type="info"
                        className="text-2xl"
                        theme="blue"
                        onClick={() => handleDetailCard(customer.Id || "")}
                      />
                    </div>
                    {isAdminPanel && (
                      <div className="flex w-full justify-evenly">
                        <Icon
                          type="edit"
                          theme=""
                          className="text-2xl text-green-600"
                        />
                        <Icon
                          type="delete"
                          theme=""
                          className="text-2xl text-red-600"
                          onClick={() => handleDelete(customer.Name ?? "")}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
          )}
        </div>

        {showValidationModal && (
          <ValidationModal
            setShowValidationModal={setShowValidationModal}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
        <BottomNav title="Clients" />
      </div>
    </>
  );
}

export default Clients;
